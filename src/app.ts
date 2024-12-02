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