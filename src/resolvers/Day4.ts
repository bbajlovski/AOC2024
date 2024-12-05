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

    let numberOfXmas = 0;
    let lines: string[] = [];
    reader.on('line', (line) => {
        lines.push(line);
    });

    await events.once(reader, 'close');

    lines.forEach((line, lineIndex) => {        
        for (let charIndex = 0; charIndex < line.length; charIndex++) {            
            if (line[charIndex] === 'X') {
                let d = inWhichDirectionIsGivenLetter(lines, charIndex, lineIndex, 'M');
                if (d.length === 0) {
                    continue;
                } else {
                    d.forEach(({dX, dY}) => {
                        let y = lineIndex + 2*dY;
                        let x = charIndex + 2*dX;
                        if (y >= 0 && y < lines.length && x >= 0 && x < lines[y].length && lines[y][x] === 'A') {
                            let y = lineIndex + 3*dY;
                            let x = charIndex + 3*dX;
                            if (y >= 0 && y < lines.length && x >= 0 && x < lines[y].length && lines[y][x] === 'S') {
                                numberOfXmas++;
                            }
                        }
                    });
                }
            }
        }
    });

    return "" + numberOfXmas;
}

export const resolveTwo = async (filename: string): Promise<any> => {

    const reader = readline.createInterface({
        input: fs.createReadStream("./inputs/" + filename),
        crlfDelay: Infinity
    });

    let numberOfXmas = 0;
    let lines: string[] = [];
    reader.on('line', (line) => {
        lines.push(line);
    });

    await events.once(reader, 'close');

    lines.forEach((line, lineIndex) => {        
        for (let charIndex = 0; charIndex < line.length; charIndex++) {            
            if (containsTwoMASDiagonally(lines, charIndex, lineIndex)) {                
                numberOfXmas++;
            }
        }
    });

    return "" + numberOfXmas;
}

const inWhichDirectionIsGivenLetter = (lines: string[], x: number, y: number, letter: string): Array<{ dX: number, dY: number }> => {
    let d: Array<{ dX: number, dY: number }> = [];
    
    for (let checkX = x - 1; checkX <= x + 1; checkX++) {
        for (let checkY = y - 1; checkY <= y + 1; checkY++) {
            if (checkX >= 0 && checkY >= 0 && checkY < lines.length && checkX < lines[checkY].length && lines[checkY][checkX] === letter) {
                d.push({dX: checkX - x, dY: checkY - y });
            }
        }
    }

    return d;
}

const containsTwoMASDiagonally = (lines: string[], x: number, y: number): boolean => {
    


    if (y + 2 >= lines.length || x + 2 >= lines[y].length) {
        return false;
    }

    if (lines[y + 1][x + 1] !== 'A') {
        return false;
    }

    if ((lines[y][x] === 'M' && lines[y + 2][x + 2] === 'S' ||
        lines[y][x] === 'S' && lines[y + 2][x + 2] === 'M') &&
        (lines[y + 2][x] === 'M' && lines[y][x + 2] === 'S' ||  
        lines[y + 2][x] === 'S' && lines[y][x + 2] === 'M')) {
        return true;
    }

    return false;

}