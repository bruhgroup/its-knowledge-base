import {LlamaCpp} from "langchain/llms/llama_cpp";
import {CharacterTextSplitter, RecursiveCharacterTextSplitter, TokenTextSplitter} from "langchain/text_splitter";
import {Redis} from "ioredis";
import {CacheBackedEmbeddings} from "langchain/embeddings/cache_backed";
import {LlamaCppEmbeddings} from "langchain/embeddings/llama_cpp";
import docLoader from "./docLoader";
import {RedisByteStore} from "langchain/storage/ioredis";
import {FaissStore} from "langchain/vectorstores/faiss";

const underlyingEmbeddings = new LlamaCppEmbeddings({
    modelPath: "../resources/models/llama-2-7b-chat.Q2_k.gguf",
});
const redisClient = new Redis("redis://143.110.230.212:6379");
redisClient.on("connect", () => {
    console.log("connected to redis")
    asdf();
});
redisClient.on("error", (e) => console.log("error connect to redis", e));

async function asdf() {
    const redisStore = new RedisByteStore({
        client: redisClient,
    });
    console.log(redisStore);
    const cacheBackedEmbeddings = CacheBackedEmbeddings.fromBytesStore(
        underlyingEmbeddings,
        redisStore,
        {namespace: "llama-q2k:"}
    );
    console.log(cacheBackedEmbeddings);
    console.log("lolo");
    const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 10,
  chunkOverlap: 1,
});

    const documents = await splitter.splitDocuments(docLoader());

    let time = Date.now();
    console.log("starting vector store");
    const vectorstore = await FaissStore.fromDocuments(
        documents,
        cacheBackedEmbeddings
    );
    console.log(`Initial creation time: ${Date.now() - time}ms`);
    time = Date.now();
const vectorstore2 = await FaissStore.fromDocuments(
  documents,
  cacheBackedEmbeddings
);
    console.log(`Cached creation time: ${Date.now() - time}ms`);
    const keys = [];
    for await (const key of redisStore.yieldKeys()) {
        keys.push(key);
    }
    console.log(keys.slice(0, 5));
    console.log(keys.length);
}




// const response = await vectorstore.similaritySearch("password", 2);
// console.log(response);
// // const llamaPath = "../resources/models/llama-2-7b-chat.Q2_k.gguf";
// // const question = "Where do Llamas come from?";
// //
// // const model = new LlamaCpp({modelPath: llamaPath});
// //
// // console.log(`You: ${question}`);
// // const response = await model.call(question);
// // console.log(`AI : ${response}`);
