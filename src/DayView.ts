import * as utils from "./tools/Utils";

export class DayView {

    id: number;
    answerOne: string;
    answerTwo: string;
    executionTimeOne: number;
    executionTimeTwo: number;
    input: string;

    constructor(
        day: string
    ) {        
        
        this.answerOne = "TBD";
        this.answerTwo = "TBD";
        this.executionTimeOne = 0;
        this.executionTimeTwo = 0;
        this.input = "";

        if (utils.isNumeric(day)) {
            this.id = +day;
            this.input = "day" + this.id +".txt";

        } else {
            this.id = -1;
            this.answerOne = "N/A";
            this.answerTwo = "N/A";
        }
    }

    resolve = async (): Promise<any> => { 
        if (this.id > 0) {
            try {
                
                const dayResolver = await import("./resolvers/Day" + this.id);

                var start = new Date().getTime();
                this.answerOne = await dayResolver.resolveOne(this.input);
                this.executionTimeOne = new Date().getTime() - start;

                start = new Date().getTime();
                this.answerTwo = await dayResolver.resolveTwo(this.input);
                this.executionTimeTwo = new Date().getTime() - start;
                
            } catch (error) {
                console.log(`\nDay ${this.id} not implemented yet!`);
                console.log(error);
            };
        }
    }
}