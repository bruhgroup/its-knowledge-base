import os
from langchain.globals import set_debug
from langchain.globals import set_verbose
from langChainModel import response_handler
# Globals for debugging
set_debug(False)
set_verbose(False)
os.environ['MODEL_FILEPATH'] = "C:\\Users\\Vince\\AppData\\Local\\nomic.ai\\GPT4All\\mistral-7b-openorca.Q4_0.gguf.bin"


response = response_handler("How do I reset my password?")

print(response)
