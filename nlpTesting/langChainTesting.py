
from langchain.docstore.document import Document
import json
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import GPT4AllEmbeddings
from langchain.llms import GPT4All
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.retrievers.self_query.base import SelfQueryRetriever

template = """Answer the question based only on the following context:

{context}

Question: {question}
"""

MODEL_FILEPATH = "C:\\Users\\salin\\AppData\\Local\\nomic.ai\\GPT4All\\mistral-7b-openorca.Q4_0.gguf.bin"
llm = GPT4All(model=MODEL_FILEPATH)


text_splitter = CharacterTextSplitter(
    separator = "\n\n",
    chunk_size = 1000,
    chunk_overlap  = 200,
    length_function = len,
    is_separator_regex = False,
)

def loadJSONFile(file_path):
    docs=[]
    # Load JSON file
    with open(file_path, encoding="iso-8859-1") as file:
        data = json.load(file)

    # Iterate through 'pages'
    for index, question in data.items():
        q = question['question']
        a = question['answer']
        docs.append(Document(page_content=a, metadata={index: q}))
    return docs


docs = loadJSONFile("./data.json")
documents = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents, GPT4AllEmbeddings())
query = ("Hawaian keyboard")

document_content_description = "Answers to technical problems"
metadata_field_info = [
    AttributeInfo(
        name="25",
        description="The question for the problem",
        type="string"
    )
]
retriever = SelfQueryRetriever.from_llm(
    llm,
    vectorstore,
    document_content_description,
    metadata_field_info,
)

retriever.invoke("How to enable hawaiian")

