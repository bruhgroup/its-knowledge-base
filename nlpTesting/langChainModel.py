from jsonLoader import load_json_file
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.storage import LocalFileStore
from langchain.embeddings import GPT4AllEmbeddings, CacheBackedEmbeddings
from langchain.llms import GPT4All
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema import StrOutputParser
from langchain.globals import set_debug
from langchain.globals import set_verbose

set_debug(True)
set_verbose(True)

MODEL_FILEPATH = "../resources/models/mistral-7b-openorca.Q4_0.gguf"

template = """You are a chatbot. You are assisting a human with a question. 
Human asks: {question}. 
Context: {context}"""
prompt = PromptTemplate.from_template(template)

model = GPT4All(model=MODEL_FILEPATH, n_threads=8, device="gpu")

text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=1200,
    chunk_overlap=200,
)

underlying_embeddings = GPT4AllEmbeddings()
fs = LocalFileStore("./cache")
cached_embedder = CacheBackedEmbeddings.from_bytes_store(
    underlying_embeddings, fs
)

docs = load_json_file("../resources/json/data.json")
documents = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents, cached_embedder)
query = "How do i reset my password?"
retriever = vectorstore.as_retriever(search_kwargs={"k": 1})

chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | model
        | StrOutputParser()
)

print(chain.invoke(query))
