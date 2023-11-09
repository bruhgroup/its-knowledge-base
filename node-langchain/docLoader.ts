import {Document} from "langchain/document";
import data from '../resources/json/data.json' assert {type: 'json'};

const docLoader = () => {
    const docs = [];
    for (const [key, value] of Object.entries(data)) {
        docs.push(new Document({pageContent: value.answer, metadata: {source: key, question: value.question}}));
    }
    return docs;
}

export default docLoader;