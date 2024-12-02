export const addSortedInArray = (array: number[], value: number): number[] => {

    let index = 0;
    while (index < array.length && array[index] < value) {
        index++;
    }
    array.splice(index, 0, value);

    return array;
}

export const countAppearances = (array: number[], value: number): number => {
    let counter = 0;
    array.forEach((element) => {
        if (element === value) {
            counter++;
        }
    });

    return counter;
}

export const stringArrayToNumberArray = (array: string[]): number[] => {
    return array.map((element) => {
        return +element;
    });
}

export const isSorted = (array: number[]): boolean => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }

    return true;
}

export const maxNeighbourDistance = (array: number[]): number => {
    let maxDistance = 0;
    for (let i = 0; i < array.length - 1; i++) {
        let distance = array[i + 1] - array[i];
        if (distance > maxDistance) {
            maxDistance = distance;
        }
    }

    return maxDistance;
}

export const minNeighbourDistance = (array: number[]): number => {
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < array.length - 1; i++) {
        let distance = array[i + 1] - array[i];
        if (distance < minDistance) {
            minDistance = distance;
        }
    }

    return minDistance;
}