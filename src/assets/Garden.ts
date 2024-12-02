type Step =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location"
  | undefined;

export class Garden {
  private process: {
    processType: Step;
    destination: number;
    source: number;
    range: number;
  }[];

  constructor(lines: string[]) {
    this.process = [];
    let processType: Step = undefined;
    lines.forEach((line) => {
      if (line.indexOf(" map:") > -1) {
        processType = line.split(" ")[0] as Step;
      } else {
        let params = line.split(" ");
        let step = {
          processType: processType,
          destination: +params[0],
          source: +params[1],
          range: +params[2],
        };
        this.process.push(step);
      }
    });
  }

  public getLocation = (seed: number) => {
    let location = -1;
    let transfer = seed;

    const steps: Step[] = [
      "seed-to-soil",
      "soil-to-fertilizer",
      "fertilizer-to-water",
      "water-to-light",
      "light-to-temperature",
      "temperature-to-humidity",
      "humidity-to-location",
    ];
    let sortedProcess = this.process.sort((processA, processB) => {
        return (processA.destination + processA.range) - (processB.destination + processB.range);
    });

    steps.forEach((step) => {
      let stop = false;
      sortedProcess.forEach((processStep) => {
        let sourceStart = processStep.source;
        let sourceEnd = processStep.source + processStep.range - 1;
        if (
          !stop &&
          processStep.processType === step &&
          sourceStart <= transfer && transfer <= sourceEnd
        ) {
          transfer = processStep.destination + (transfer - processStep.source);
          stop = true;
        }
      });
    });

    location = transfer;
    return location;
  };

  public minimumValidLocation = (location: number): boolean => {

    const steps: Step[] = [
      "seed-to-soil",
      "soil-to-fertilizer",
      "fertilizer-to-water",
      "water-to-light",
      "light-to-temperature",
      "temperature-to-humidity",
      "humidity-to-location",
    ];
    const backwardSteps = steps.reverse();

    let transfer = location;

    let stop = false;
    backwardSteps.forEach((step) => {
      stop = false;
      this.process.forEach((processStep) => {
        let destinationStart = processStep.destination;
        let destinationEnd = processStep.destination + processStep.range - 1;
        if (
          !stop &&
          processStep.processType === step &&
          destinationStart <= transfer && transfer <= destinationEnd
        ) {
          transfer = processStep.source + (transfer - processStep.destination);
          stop = true;
        }
      });
    });

    return stop;
  };
}
