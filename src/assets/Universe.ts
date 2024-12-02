export class Universe {
  originalGalaxies: string[][];
  galaxies: string[][];

  constructor(universe: string[][]) {
    this.originalGalaxies = universe;
    this.galaxies = this.clone(universe);
  }

  private isEmptyColumn = (
    columnIndex: number,
    galaxies: string[][]
  ): boolean => {
    let isEmpty = true;
    galaxies.forEach((row) => {
      if (row[columnIndex] !== ".") {
        isEmpty = false;
      }
    });
    return isEmpty;
  };

  private isEmptyRow = (rowIndex: number, galaxies: string[][]): boolean => {
    let isEmpty = true;
    galaxies[rowIndex].forEach((field) => {
      if (field !== ".") {
        isEmpty = false;
      }
    });
    return isEmpty;
  };

  private addColumn = (columnIndex: number, galaxies: string[][]) => {
    galaxies.forEach((row) => {
      row.splice(columnIndex, 0, ".");
    });
  };

  private addRow = (rowIndex: number, galaxies: string[][]) => {
    let newRow: string[] = [];
    galaxies[0].forEach((field) => {
      newRow.push(".");
    });
    galaxies.splice(rowIndex, 0, newRow);
  };

  public expandUniverse = () => {
    let expandedGalaxies = this.clone(this.galaxies);

    let offset = 0;
    this.galaxies.forEach((row, rowIndex) => {
      if (this.isEmptyRow(rowIndex, this.galaxies)) {
        this.addRow(rowIndex + offset, expandedGalaxies);
        offset++;
      }
    });

    offset = 0;
    this.galaxies[0].forEach((field, columnIndex) => {
      if (this.isEmptyColumn(columnIndex, this.galaxies)) {
        this.addColumn(columnIndex + offset, expandedGalaxies);
        offset++;
      }
    });

    this.galaxies = expandedGalaxies;
  };

  private clone = (oldGalaxies: string[][]): string[][] => {
    let newGalaxies: string[][] = [];
    oldGalaxies.forEach((row) => {
      let newRow: string[] = [];
      row.forEach((field) => {
        newRow.push(field);
      });
      newGalaxies.push(newRow);
    });
    return newGalaxies;
  };

  private calculateDistance = (
    galaxyOne: { rowIndex: number; columnIndex: number },
    galaxyTwo: { rowIndex: number; columnIndex: number }
  ): number => {
    return (
      Math.abs(galaxyOne.rowIndex - galaxyTwo.rowIndex) +
      Math.abs(galaxyOne.columnIndex - galaxyTwo.columnIndex)
    );
  };

  private calculateDistanceWithExpansion = (
    expansionSize: number,
    galaxyOne: { rowIndex: number; columnIndex: number },
    galaxyTwo: { rowIndex: number; columnIndex: number }
  ): number => {
    let minRowIndex = Math.min(galaxyOne.rowIndex, galaxyTwo.rowIndex);
    let maxRowIndex = Math.max(galaxyOne.rowIndex, galaxyTwo.rowIndex);

    let minColumnIndex = Math.min(galaxyOne.columnIndex, galaxyTwo.columnIndex);
    let maxColumnIndex = Math.max(galaxyOne.columnIndex, galaxyTwo.columnIndex);

    let totalRowsExpansion = 0;
    for (let rowIndex = minRowIndex; rowIndex <= maxRowIndex; rowIndex++) {
      if (this.isEmptyRow(rowIndex, this.galaxies)) {
        totalRowsExpansion += expansionSize - 1;
      }
    }

    let totalColumnsExpansion = 0;
    for (
      let columnIndex = minColumnIndex;
      columnIndex <= maxColumnIndex;
      columnIndex++
    ) {
      if (this.isEmptyColumn(columnIndex, this.galaxies)) {
        totalColumnsExpansion += expansionSize - 1;
      }
    }

    return (
      this.calculateDistance(galaxyOne, galaxyTwo) +
      totalRowsExpansion +
      totalColumnsExpansion
    );
  };

  public sumDistances = (): number => {
    let sum = 0;
    let galaxies = this.galaxies;

    galaxies.forEach((row, rowIndex) => {
      galaxies[rowIndex].forEach((field, columnIndex) => {
        if (field === "#") {
          for (
            let destinationRowIndex = rowIndex;
            destinationRowIndex < galaxies.length;
            destinationRowIndex++
          ) {
            for (
              let destinationColumnIndex = 0;
              destinationColumnIndex < row.length;
              destinationColumnIndex++
            ) {
              if (
                (destinationRowIndex === rowIndex &&
                  destinationColumnIndex > columnIndex) ||
                destinationRowIndex > rowIndex
              ) {
                if (
                  galaxies[destinationRowIndex][destinationColumnIndex] === "#"
                ) {
                  let distance = this.calculateDistance(
                    { rowIndex: rowIndex, columnIndex: columnIndex },
                    {
                      rowIndex: destinationRowIndex,
                      columnIndex: destinationColumnIndex,
                    }
                  );
                  sum += distance;
                }
              }
            }
          }
        }
      });
    });

    return sum;
  };

  public sumDistancesWithVirtualExpansion = (expansionSize: number): number => {
    let sum = 0;
    let galaxies = this.galaxies;

    galaxies.forEach((row, rowIndex) => {
      galaxies[rowIndex].forEach((field, columnIndex) => {
        if (field === "#") {
          for (
            let destinationRowIndex = rowIndex;
            destinationRowIndex < galaxies.length;
            destinationRowIndex++
          ) {
            for (
              let destinationColumnIndex = 0;
              destinationColumnIndex < row.length;
              destinationColumnIndex++
            ) {
              if (
                (destinationRowIndex === rowIndex &&
                  destinationColumnIndex > columnIndex) ||
                destinationRowIndex > rowIndex
              ) {
                if (
                  galaxies[destinationRowIndex][destinationColumnIndex] === "#"
                ) {
                  let distance = this.calculateDistanceWithExpansion(
                    expansionSize,
                    { rowIndex: rowIndex, columnIndex: columnIndex },
                    {
                      rowIndex: destinationRowIndex,
                      columnIndex: destinationColumnIndex,
                    }
                  );
                  sum += distance;
                }
              }
            }
          }
        }
      });
    });

    return sum;
  };

  public restoreOriginalGalaxies = () => {
    this.galaxies = this.clone(this.originalGalaxies);
  };

  public print = () => {
    this.galaxies.forEach((row) => {
      row.forEach((field) => {
        process.stdout.write(field + " ");
      });
      process.stdout.write("\n");
    });
  };
}
