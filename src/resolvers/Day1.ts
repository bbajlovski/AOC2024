import fs from "fs";
import readline from "readline";
import events from "events";
import { splitLineWithMultipleEmptySpaces } from "../tools/StringUtils";
import { addSortedInArray, countAppearances } from "../tools/ArrayUtils";

   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var leftList: number[] = [];
    var rightList: number[] = [];
    var totalDistance = 0;  
    reader.on('line', (line) => {
        var counter = 0;
        splitLineWithMultipleEmptySpaces(line).forEach((value) => {
            const digit = parseInt(value);
            if (counter === 0) {
                leftList = addSortedInArray(leftList, digit);
            } else {
                rightList = addSortedInArray(rightList, digit);
            }
            counter++;
        });
    });   


    await events.once(reader, 'close');

    for (var index = 0; index < leftList.length; index++) {
        totalDistance += Math.abs(leftList[index] - rightList[index]);
    }

    return "" + totalDistance;
}

export const resolveTwo = async (filename: string): Promise<any> => {
    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var leftList: number[] = [];
    var rightList: number[] = [];
    var similarityScore = 0;  
    reader.on('line', (line) => {
        var counter = 0;
        splitLineWithMultipleEmptySpaces(line).forEach((value) => {
            const digit = parseInt(value);
            if (counter === 0) {
                leftList.push(digit);
            } else {
                rightList.push(digit);
            }
            counter++;
        });
    });   


    await events.once(reader, 'close');

    for (var index = 0; index < leftList.length; index++) {
        similarityScore += leftList[index] * countAppearances(rightList, leftList[index]);
    }

    return "" + similarityScore;
}
