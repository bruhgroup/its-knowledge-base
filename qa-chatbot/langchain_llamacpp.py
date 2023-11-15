from langchain.globals import set_debug
from langchain.globals import set_verbose

set_debug(True)
set_verbose(True)

from langchain.llms import LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.embeddings import LlamaCppEmbeddings, CacheBackedEmbeddings
from langchain.storage import LocalFileStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.chroma import Chroma
from nlpTesting.jsonLoader import load_json_file

# Use wsl python interpreter
# check if you have nvidia-cuda-toolkit --> nvcc -V
# if not, sudo apt install nvidia-cuda-toolkit
# CMAKE_ARGS="-DLLAMA_CUBLAS=on" pip install llama-cpp-python --force-reinstall --upgrade --no-cache-dir

# NOTE: Unable to test whether this actually works or not

# https://www.reddit.com/r/LocalLLaMA/comments/155po2p/get_llama_2_prompt_format_right/

path = "../resources/models/llama-2-7b-chat.Q3_K_M.gguf"

template = """\
[INST] <<SYS>>
You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
<</SYS>>

{question} [/INST]\
"""
prompt = PromptTemplate(template=template, input_variables=["question"])
callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
model = LlamaCpp(
    model_path=path,
    max_tokens=1024,
    n_threads=10,
    callback_manager=callback_manager,
    verbose=True,  # Verbose is required to pass to the callback manager
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
)

underlying_embeddings = LlamaCppEmbeddings(model_path=path)
fs = LocalFileStore("./cache/llama")
cached_embedder = CacheBackedEmbeddings.from_bytes_store(
    underlying_embeddings, fs
)

docs = load_json_file("../resources/json/data.json")
documents = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents, cached_embedder)

query = "How do I reset my password?"

qa_chain = RetrievalQA.from_chain_type(
    llm=model,
    retriever=vectorstore.as_retriever(),
    chain_type_kwargs={"prompt": prompt}
)

response = f'{qa_chain.invoke({"query": query})}'
print(response)
