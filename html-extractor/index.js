import fs from 'fs';
import {parse} from "node-html-parser";
import {decode} from "html-entities";

const path = "../resources/html/";

function extract_text(fileName) {
    const file = fs.readFileSync(`${path}${fileName}`);
    const parsed = parse(file.toString());

    const question = parsed.querySelector("#kb_article_question");
    const answer = parsed.querySelector("#kb_article_text");

    if (!question || !answer) {
        console.error(`missing data for ${fileName}`, {question, answer})
        return null;
    }

    return {
        id: fileName.slice(0, -5),
        question: clean_text(question.rawText),
        answer: clean_text(answer.rawText),
    };
}

function clean_text(string) {
    let cleaned = string
        .replace(/&nbsp;/g, " ") // remove non-breaking spaces
        .replace(/\s\s+/g, (s) => s.length > 2 ? "\n" : " ") // replace with newline or single space
        .trim() // remove leading/trailing whitespaces
    cleaned = decode(cleaned); // convert html entities to actual symbol
    return cleaned;
}

const files = fs.readdirSync(path);
const jsons = {};
console.log(`Reading ${files.length} files...`);
for (const fileName of files) {
    if (fileName === ".gitkeep") continue;

    const data = extract_text(fileName);
    if (!data) continue;

    const {id, ...rest} = data;
    jsons[id] = rest;
}

fs.writeFile(`../resources/json/data.json`, JSON.stringify(jsons, null, 2), (err) => {
    if (err) console.log(err);
    else console.log(`wrote ${Object.keys(jsons).length} data`)
});