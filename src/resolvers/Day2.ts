import fs from "fs";
import readline from "readline";
import events from "events";
import { splitLineWithMultipleEmptySpaces } from "../tools/StringUtils";
import { isSorted, maxNeighbourDistance, minNeighbourDistance, stringArrayToNumberArray } from "../tools/ArrayUtils";


   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let numberOfSafeReports = 0;  
    reader.on('line', (line) => {
        var report = stringArrayToNumberArray(splitLineWithMultipleEmptySpaces(line));

        if ((isSorted(report) || isSorted(report.reverse())) && maxNeighbourDistance(report) <= 3 && minNeighbourDistance(report) >= 1) {
            numberOfSafeReports++;
        }
    });

    await events.once(reader, 'close');

    return "" + numberOfSafeReports;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let numberOfSafeReports = 0;  
    reader.on('line', (line) => {
        var report = stringArrayToNumberArray(splitLineWithMultipleEmptySpaces(line));

        if ((isSorted(report) || isSorted(report.reverse())) && maxNeighbourDistance(report) <= 3 && minNeighbourDistance(report) >= 1) {
            numberOfSafeReports++;
        } else {
            var stop = false;
            
            for (let index = 0; index < report.length && !stop; index++) {
                var refactoredReport = report.slice(0, index).concat(report.slice(index + 1));

                if ((isSorted(refactoredReport) || isSorted(refactoredReport.reverse())) && maxNeighbourDistance(refactoredReport) <= 3 && minNeighbourDistance(refactoredReport) >= 1) {
                    numberOfSafeReports++;
                    stop = true;
                }

            };
        }
    });

    await events.once(reader, 'close');

    return "" + numberOfSafeReports;
}


