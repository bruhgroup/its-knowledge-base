import fs from 'fs';
import {parse} from "node-html-parser";

const path = "../resources/html/";

function extract_text(fileName) {
    const file = fs.readFileSync(`${path}${fileName}`);
    const parsed = parse(file.toString());

    let question = parsed.querySelector("#kb_article_question");
    let answer = parsed.querySelector("#kb_article_text");

    if (!question || !answer) {
        console.error(`missing data for ${fileName}`, {question, answer})
        return null;
    }

    question = question.rawText.trim();
    answer = answer.rawText.trim();

    return {id: fileName.slice(0, -5), question, answer};
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

fs.writeFile(`../resources/json/data.json`, JSON.stringify(jsons), (err) => {
    if (err) console.log(err);
    else console.log(`wrote ${jsons.length} data`)
});