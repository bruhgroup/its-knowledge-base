import json
with open('data.json', 'r', encoding="iso-8859-1") as f:
    intents = json.load(f)

print(intents["565"]["question"])

#     print(intent['question'])
# TypeError: string indices must be integers
for intent, question in intents.items():
    print(question['question'])