import { createInterface } from "readline/promises";
import { DayView } from "./DayView";




const main = async () => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    do {
        var answer = await readline.question("Pick a Day (or type Q/q to quit): ");
        if (answer.toLowerCase() === "q") break;
        let dayView: DayView = new DayView(answer);
        await dayView.resolve();
        console.log(`\n--> Day ${dayView.id} (data: ${dayView.input})`);
        console.log(`----> Part 1: ${dayView.answerOne} (${dayView.executionTimeOne}ms)`);
        console.log(`----> Part 2: ${dayView.answerTwo} (${dayView.executionTimeTwo}ms)`);
        console.log("\n");
    } while(true);

    readline.close();
}

main();

// const question = (questionText: string) =>
//     new Promise<string>(resolve => readline.question(questionText, resolve))
//         .finally(() => readline.close());

// console.clear();
// console.log("##################################");
// console.log("# Welcome to Advent of Code 2024 #");
// console.log("##################################\n");

// const answer = async (prompt: string) => {
//     // const prompt = await question("Pick a Day: ")
//     let dayView: DayView = new DayView(prompt);
//     await dayView.resolve();
//     console.log(`\n--> Day ${dayView.id} (data: ${dayView.input})`);
//     console.log(`----> Part 1: ${dayView.answerOne} (${dayView.executionTimeOne}ms)`);
//     console.log(`----> Part 2: ${dayView.answerTwo} (${dayView.executionTimeTwo}ms)`);
// };



// // Loop question until answer from console is correct
// readline.on("close", async () => {
//     const prompt = await question("Pick a Day (or type Q/q to quit): ");
//     if (prompt.toLowerCase() === "q") {
//         process.exit(0);
//     } else {
//         await answer(prompt);
//     }
// });
