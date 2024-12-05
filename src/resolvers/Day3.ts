import fs from "fs";
import readline from "readline";
import events from "events";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let multiplicationsSum = 0;
    let input: string = "";
    reader.on('line', (line) => {
        input = input.concat(line);
    });

    await events.once(reader, 'close');

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let matches = input.match(regex);

    matches?.forEach((match) => {
        let numbers = match.match(/\d{1,3}/g);
        multiplicationsSum += parseInt(numbers![0]) * parseInt(numbers![1]);
    });

    return "" + multiplicationsSum;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let multiplicationsSum = 0;
    let input: string = "";
    reader.on('line', (line) => {
        input = input.concat(line);
    });

    await events.once(reader, 'close');

    const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;    
    let matches = input.match(regex);

    let doIt = true;
    matches?.forEach((match) => {
        if (match === "do()") {
            doIt = true;
        } else if (match === "don't()") {
            doIt = false;
        } else if (doIt) {
            let numbers = match.match(/\d{1,3}/g);
            multiplicationsSum += parseInt(numbers![0]) * parseInt(numbers![1]);
        }
    });

    return "" + multiplicationsSum;
}


