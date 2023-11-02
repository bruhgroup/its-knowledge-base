from jsonLoader import load_json_file
from langchain.text_splitter import RecursiveCharacterTextSplitter
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

sources = set()


def format_docs(input_docs):
    content = set()
    for d in input_docs:
        metadata = list(d.metadata)
        for m in metadata:
            sources.add(f'https://www.hawaii.edu/askus/{m}')
        content.add(d.page_content)
    return "\n\n".join(content)


MODEL_FILEPATH = "../resources/models/mistral-7b-openorca.Q4_0.gguf"

template = """You are a chatbot. You are assisting a human with a question. 
Human asks: {question}. 
Here is some context. Use this to answer the human's question: {context}"""
prompt = PromptTemplate.from_template(template)

model = GPT4All(
    model=MODEL_FILEPATH,
    max_tokens=1024,
    n_threads=8,
    device="gpu"
)

# https://python.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/split_by_token
# Splitting by character may result in some loss of context? Maybe worth attempting to split by tokens.
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
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
query = "How do I reset my password?"

retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | prompt
        | model
        | StrOutputParser()
)

response = f'{chain.invoke(query)}\n\nSources: {", ".join(sources)}'
print(response)
