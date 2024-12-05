import fs from "fs";
import readline from "readline";
import events from "events";
   
export const resolveOne = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var rules: { prev: number, next: number }[] = [];
    var updates: number[][] = [];
    var sumOfMiddle = 0;  
    reader.on('line', (line) => {

        if (line.includes("|")) {
            let lineArray = line.split("|").map(Number);
            let rule = { prev: lineArray[0], next: lineArray[1] };
            rules.push(rule);
        } else if (line.includes(",")) {
            updates.push(line.split(",").map(Number));
        }
    });   

    await events.once(reader, 'close');

    updates.forEach(update => {
        if (isUpdateInProperOrder(update, rules)) {
            sumOfMiddle += update[(update.length - 1) / 2];
        }
    });

    return "" + sumOfMiddle;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    var rules: { prev: number, next: number }[] = [];
    var updates: number[][] = [];
    var sumOfMiddle = 0;  
    reader.on('line', (line) => {

        if (line.includes("|")) {
            let lineArray = line.split("|").map(Number);
            let rule = { prev: lineArray[0], next: lineArray[1] };
            rules.push(rule);
        } else if (line.includes(",")) {
            updates.push(line.split(",").map(Number));
        }
    });   

    await events.once(reader, 'close');

    updates.forEach(update => {
        if (!isUpdateInProperOrder(update, rules)) {
            let sortedUpdate = sortUpdateByRules([...update], rules);
            sumOfMiddle += sortedUpdate[(sortedUpdate.length - 1) / 2];
        }
    });

    return "" + sumOfMiddle;
}

const isUpdateInProperOrder = (update: number[], rules: { prev: number, next: number }[]): boolean => {
    let isProper = true;

    update.forEach((currentPage, currentIndex) => {
        update.forEach((prevPage, prevIndex) => {
            if (prevIndex < currentIndex) {
                rules.forEach(rule => {
                    if (rule.prev === currentPage && rule.next === prevPage) {
                        isProper = false;
                    }
                });
            }
        })
    });

    return isProper;
}

const sortUpdateByRules = (update: number[], rules: { prev: number, next: number }[]): number[] => {
    let sortedUpdate = [...update];

    while (!isUpdateInProperOrder(sortedUpdate, rules)) {
        let isProper = true;
        let sortedUpdateCopy = [...sortedUpdate];
        sortedUpdate.forEach((currentPage, currentIndex) => {
            sortedUpdate.forEach((prevPage, prevIndex) => {
                if (prevIndex < currentIndex && isProper) {
                    rules.forEach(rule => {
                        if (rule.prev === currentPage && rule.next === prevPage) {
                            isProper = false;
                            let temp = currentPage;
                            sortedUpdateCopy.splice(currentIndex, 1);
                            sortedUpdateCopy.splice(prevIndex, 0, currentPage);
                        }
                    });
                }
            })
        });
        sortedUpdate = [...sortedUpdateCopy];
    }
        
    return sortedUpdate;
}