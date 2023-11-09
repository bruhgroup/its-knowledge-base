import {LlamaCpp} from "langchain/llms/llama_cpp";
import {TokenTextSplitter} from "langchain/text_splitter";
import {CacheBackedEmbeddings} from "langchain/embeddings/cache_backed";
import {LlamaCppEmbeddings} from "langchain/embeddings/llama_cpp";
import docLoader from "./docLoader";
import {Chroma} from "langchain/vectorstores/chroma";
import {ChromaClient} from "chromadb";

const splitter = new TokenTextSplitter({
    encodingName: "gpt2",
    chunkSize: 10,
    chunkOverlap: 0,
});
const documents = await splitter.splitDocuments(docLoader());

const underlyingEmbeddings = new LlamaCppEmbeddings({
    modelPath: "../resources/models/llama-2-7b-chat.Q2_k.gguf",
});

let time = Date.now();
const vectorStore = await Chroma.fromDocuments(
    documents,
    underlyingEmbeddings,
    {
        collectionName: "llama-q2k",
        url: "http://143.110.230.212:8000",
        collectionMetadata: {
    "hnsw:space": "cosine",
  },
    },
    );
console.log(`Initial creation time: ${Date.now() - time}ms`);
time = Date.now();

const response = await vectorStore.similaritySearch("password", 1);
console.log(vectorStore.asRetriever({k: 1}))

console.log(response);
// const vectorstore2 = await FaissStore.fromDocuments(
//   documents,
//   cacheBackedEmbeddings
// );
// console.log(`Cached creation time: ${Date.now() - time}ms`);

// const llamaPath = "../resources/models/llama-2-7b-chat.Q2_k.gguf";
// const question = "Where do Llamas come from?";
//
// const model = new LlamaCpp({modelPath: llamaPath});
//
// console.log(`You: ${question}`);
// const response = await model.call(question);
// console.log(`AI : ${response}`);
