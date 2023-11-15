from typing import List, Tuple

from fastapi import FastAPI
from langchain.embeddings import GPT4AllEmbeddings, CacheBackedEmbeddings
from langchain.globals import set_debug
from langchain.globals import set_verbose
from langchain.llms import LlamaCpp
from langchain.prompts import  PromptTemplate
from langchain.pydantic_v1 import BaseModel, Field
from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough, RunnableParallel
from langchain.storage import LocalFileStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langserve import add_routes
from starlette.middleware.cors import CORSMiddleware
import loader

# Debugging Variables
set_debug(True)
set_verbose(True)


# Define Sources
sources = set()


# Format Docs as string
def format_docs(input_docs):
    content = set()
    for d in input_docs:
        metadata = list(d.metadata)
        for m in metadata:
            sources.add(f'https://www.hawaii.edu/askus/{m}')
        content.add(d.page_content)
    return "\n\n".join(content)


# Path to model
MODEL_FILEPATH = "../../resources/models/llama2Medium.gguf"

# https://www.pinecone.io/learn/llama-2/
TEMPLATE = """\
<<SYS>> You are a helpful, respectful and honest assistant. If a question does not make any sense, \
or is not factually coherent, explain why instead of answering something not correct.

If you are unsure about an answer, or if the relevant documents provided are insufficient to answer honestly, \
you should say "Sorry, I don't have enough information to answer that question."

Here are some relevant documents that you can refer to:
{context}
<</SYS>>

[INST]Respond to the following question with step-by-step instructions to assist the user.[/INST] \
User: {question}
"""

prompt = PromptTemplate.from_template(TEMPLATE)

# Define Model
model = LlamaCpp(
    model_path=MODEL_FILEPATH,
    max_tokens=256,
    n_ctx=4096,
    n_batch=2048,
    n_threads=10,
    n_gpu_layers=50,
    f16_kv=True,
    verbose=True,
)


# User input
class ChatHistory(BaseModel):
    """Chat history with the bot."""

    chat_history: List[Tuple[str, str]] = Field(
        ...,
        extra={"widget": {"type": "chat", "input": "question", "output": "answer"}},
    )
    question: str


# https://python.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/split_by_token
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=1000,
    chunk_overlap=200,
)

# Embed the text and cache it
underlying_embeddings = GPT4AllEmbeddings()
fs = LocalFileStore("../cache")
cached_embedder = CacheBackedEmbeddings.from_bytes_store(
    underlying_embeddings, fs, namespace="Token"
)
# Split the documents into smaller chunks
documents = text_splitter.split_documents(loader.load_json("../../resources/json/data.json"))

# Store the embedded chunks into a vector store for easy access
vectorstore = Chroma.from_documents(documents, cached_embedder)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# chain = ConversationalRetrievalChain.from_llm(model, retriever, prompt).with_types(
#     input_type=ChatHistory
# )

# FAST API SECTION
app = FastAPI(title="Chatbot", version="1.0")

origins = [
    "http://localhost:80",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


add_routes(app, retriever)


# Add typing for input
class Question(BaseModel):
    __root__: str


chain = (
        RunnableParallel({"context": retriever | format_docs, "question": RunnablePassthrough()})
        | prompt
        | model
        | StrOutputParser()
)
chain = chain.with_types(input_type=Question)

add_routes(app, chain, path="/chain", input_type=Question)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
