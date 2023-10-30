import json
import torch
from langchain.llms import GPT4All


llm = GPT4All(
    model='C:\\Users\\salin\\AppData\\Local\\nomic.ai\\GPT4All\\mistral-7b-openorca.Q4_0.gguf.bin',
)

response = llm("Hey how are you")

print(response)

# with open('data.json', 'r', encoding="iso-8859-1") as f:
#     intents = json.load(f)
#
# print(intents["565"]["question"])
#
# #     print(intent['question'])
# # TypeError: string indices must be integers
# for intent, question in intents.items():
#     print(question['question'])
#
# if torch.cuda.is_available():
#     print("Yessuh")
# else:
#     print("bruh")