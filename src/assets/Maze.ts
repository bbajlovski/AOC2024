type Coordinates = {
    row: number,
    column: number
}

export class Maze {

    originalMaze: string[][];
    maze: string[][];
    startingPosition: Coordinates;

    constructor(pipeMaze: string[][]) {
        this.originalMaze = pipeMaze;
        this.maze = this.clone(pipeMaze);
        this.startingPosition = {row: -1, column: -1};

        this.maze.forEach((row, rowIndex) => {
            row.forEach((field, columnIndex) => {
                if (field === "S") {
                    this.startingPosition = { row: rowIndex, column: columnIndex };
                }
            });
        });
    }

    public markAndCountSteps = (): number => {
        let currentPosition: Coordinates = this.startingPosition;
        let previousPosition: Coordinates = {row: -1, column: -1} as Coordinates;
        let steps = 0;
        
        while (!(currentPosition.row === this.startingPosition.row && 
            currentPosition.column === this.startingPosition.column) || steps === 0) {
            let nextPosition = this.calculateNextCoordinates(currentPosition, previousPosition, this.maze);
            previousPosition = currentPosition;
            this.maze[currentPosition.row][currentPosition.column] = "*";
            currentPosition = nextPosition;
            steps++;
        }
        return steps;
    }

    markOuterBorders = () => {
        let currentPosition: Coordinates = this.startingPosition;
        let previousPosition: Coordinates = {row: -1, column: -1} as Coordinates;
        let steps = 0;
        let maze = this.clone(this.originalMaze);
        
        while (!(currentPosition.row === this.startingPosition.row && 
            currentPosition.column === this.startingPosition.column) || steps === 0) {
            let nextPosition = this.calculateNextCoordinates(currentPosition, previousPosition, maze);
            previousPosition = currentPosition;            
            currentPosition = nextPosition;
            let outerBorderPosition = this.findOuterBorder(currentPosition);
            steps++;
        }
    }

    findOuterBorder = (position: Coordinates): Coordinates => {
        let borderPosition = {row: -1, column: -1};



        return borderPosition;

    }

    clone = (oldMaze: string[][]): string[][] => {
        let newMaze: string[][] = [];
        oldMaze.forEach((row) => {
            let newRow: string[] = [];
            row.forEach((field) => {
                newRow.push(field);
            });
            newMaze.push(newRow);
        });
        return newMaze;
    }

    calculateNextCoordinates = (currentPosition: Coordinates, previousPosition: Coordinates, maze: string[][]): Coordinates => {
        let nextCoordinates = {row: -1, column: -1};
    
        if (maze[currentPosition.row][currentPosition.column] === "S") {
            // to the above S
            if (currentPosition.row !== 0 && 
                (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
                maze[currentPosition.row - 1][currentPosition.column] === "|" ||
                maze[currentPosition.row - 1][currentPosition.column] === "F")) {
                return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
            }
            // to the below S
            if (currentPosition.row !== maze.length - 1 && 
                (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
                maze[currentPosition.row + 1][currentPosition.column] === "|" ||
                maze[currentPosition.row + 1][currentPosition.column] === "L")) {
                return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
            }
            // to the left of S
            if (currentPosition.column !== 0 && 
                (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
                maze[currentPosition.row][currentPosition.column - 1] === "-" ||
                maze[currentPosition.row][currentPosition.column - 1] === "F")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
            }
            // to the right of S
            if (currentPosition.column !== maze[0].length - 1 && 
                (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
                maze[currentPosition.row][currentPosition.column + 1] === "-" ||
                maze[currentPosition.row][currentPosition.column + 1] === "7")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
            }        
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "|") {
            // to the above
            if (currentPosition.row !== 0 && 
                previousPosition.row === currentPosition.row + 1 &&
                (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
                maze[currentPosition.row - 1][currentPosition.column] === "|" ||
                maze[currentPosition.row - 1][currentPosition.column] === "F" ||
                maze[currentPosition.row - 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
            }
    
            // to the below
            if (currentPosition.row !== maze.length - 1 && 
                previousPosition.row === currentPosition.row - 1 &&
                (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
                maze[currentPosition.row + 1][currentPosition.column] === "|" ||
                maze[currentPosition.row + 1][currentPosition.column] === "L" ||
                maze[currentPosition.row + 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
            }
    
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "-") {
            // to the left
            if (currentPosition.column !== 0 && 
                previousPosition.column === currentPosition.column + 1 &&
                (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
                maze[currentPosition.row][currentPosition.column - 1] === "-" ||
                maze[currentPosition.row][currentPosition.column - 1] === "F" ||
                maze[currentPosition.row][currentPosition.column - 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
            }
            // to the right
            if (currentPosition.column !== maze[0].length - 1 && 
                previousPosition.column === currentPosition.column - 1 &&
                (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
                maze[currentPosition.row][currentPosition.column + 1] === "-" ||
                maze[currentPosition.row][currentPosition.column + 1] === "7" ||
                maze[currentPosition.row][currentPosition.column + 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
            }
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "L") {
            // to the above
            if (currentPosition.row !== 0 && 
                previousPosition.column === currentPosition.column + 1 &&
                (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
                maze[currentPosition.row - 1][currentPosition.column] === "|" ||
                maze[currentPosition.row - 1][currentPosition.column] === "F" ||
                maze[currentPosition.row - 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
            }
            // to the right
            if (currentPosition.column !== maze[0].length - 1 && 
                previousPosition.row === currentPosition.row - 1 &&
                (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
                maze[currentPosition.row][currentPosition.column + 1] === "-" ||
                maze[currentPosition.row][currentPosition.column + 1] === "7" ||
                maze[currentPosition.row][currentPosition.column + 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
            }
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "J") {
            // to the above
            if (currentPosition.row !== 0 && 
                previousPosition.column === currentPosition.column - 1 &&
                (maze[currentPosition.row - 1][currentPosition.column] === "7" || 
                maze[currentPosition.row - 1][currentPosition.column] === "|" ||
                maze[currentPosition.row - 1][currentPosition.column] === "F" ||
                maze[currentPosition.row - 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row - 1, column: currentPosition.column};
            }
            // to the left
            if (currentPosition.column !== 0 && 
                previousPosition.row === currentPosition.row - 1 &&
                (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
                maze[currentPosition.row][currentPosition.column - 1] === "-" ||
                maze[currentPosition.row][currentPosition.column - 1] === "F" ||
                maze[currentPosition.row][currentPosition.column - 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
            }        
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "F") {
            // to the below
            if (currentPosition.row !== maze.length - 1 && 
                previousPosition.column === currentPosition.column + 1 &&
                (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
                maze[currentPosition.row + 1][currentPosition.column] === "|" ||
                maze[currentPosition.row + 1][currentPosition.column] === "L" ||
                maze[currentPosition.row + 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
            }
            // to the right
            if (currentPosition.column !== maze[0].length - 1 && 
                previousPosition.row === currentPosition.row + 1 &&
                (maze[currentPosition.row][currentPosition.column + 1] === "J" || 
                maze[currentPosition.row][currentPosition.column + 1] === "-" ||
                maze[currentPosition.row][currentPosition.column + 1] === "7" ||
                maze[currentPosition.row][currentPosition.column + 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column + 1};
            }
        }
    
        if (maze[currentPosition.row][currentPosition.column] === "7") {
            // to the below
            if (currentPosition.row !== maze.length - 1 && 
                previousPosition.column === currentPosition.column - 1 &&
                (maze[currentPosition.row + 1][currentPosition.column] === "J" || 
                maze[currentPosition.row + 1][currentPosition.column] === "|" ||
                maze[currentPosition.row + 1][currentPosition.column] === "L" ||
                maze[currentPosition.row + 1][currentPosition.column] === "*")) {
                return nextCoordinates = {row: currentPosition.row + 1, column: currentPosition.column};
            }
            // to the left
            if (currentPosition.column !== 0 && 
                previousPosition.row === currentPosition.row + 1 &&
                (maze[currentPosition.row][currentPosition.column - 1] === "L" || 
                maze[currentPosition.row][currentPosition.column - 1] === "-" ||
                maze[currentPosition.row][currentPosition.column - 1] === "F" ||
                maze[currentPosition.row][currentPosition.column - 1] === "*")) {
                return nextCoordinates = {row: currentPosition.row, column: currentPosition.column - 1};
            }
        }
    
        return nextCoordinates;
    }

    floodFill = (position: Coordinates) => {
        if (this.maze[position.row][position.column] === "*" || 
            this.maze[position.row][position.column] === "O") {
            return;
        }

        this.maze[position.row][position.column] = "O";

        let newRowIndex = position.row - 1;
        let newColumnIndex = position.column;

        if (newRowIndex >= 0) {
            this.floodFill({row: newRowIndex, column: newColumnIndex});
        }

        newRowIndex = position.row + 1;
        
        if (newRowIndex < this.maze.length) {
            this.floodFill({row: newRowIndex, column: newColumnIndex});
        }

        newColumnIndex = position.column - 1;
        newRowIndex = position.row;

        if (newColumnIndex >= 0) {
            this.floodFill({row: newRowIndex, column: newColumnIndex});
        }

        newColumnIndex = position.column + 1;

        if (newColumnIndex < this.maze[0].length) {
            this.floodFill({row: newRowIndex, column: newColumnIndex});
        }
    }

    public massiveFloodFill = () => {
        this.maze.forEach((row, rowIndex) => {
            if (this.maze[rowIndex][0] !== "*" && this.maze[rowIndex][0] !== "O") {
                this.floodFill({row: rowIndex, column: 0});
            }

            const lastColumnIndex = this.maze[0].length - 1;
            if (this.maze[rowIndex][lastColumnIndex] !== "*" && this.maze[rowIndex][lastColumnIndex] !== "O") {
                this.floodFill({row: rowIndex, column: lastColumnIndex});
            }

            if (rowIndex === 0 || rowIndex === this.maze.length - 1) {
                row.forEach((field, columnIndex) => {
                    if (this.maze[rowIndex][columnIndex] !== "*" && this.maze[rowIndex][columnIndex] !== "O") {
                        this.floodFill({row: rowIndex, column: columnIndex});
                    }
                });
            }
        });

        this.markOuterBorders();
    }

    public printMaze = () => {
        this.maze.forEach(row => {
            row.forEach(field => {
                process.stdout.write(field + " ");
            });
            process.stdout.write("\n");
        });
    }

}