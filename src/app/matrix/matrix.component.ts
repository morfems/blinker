import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { takeWhile } from "rxjs/operators";
import { timer } from "rxjs";
import { unique_colors as uniqueColors } from "unique-colors";
import { range, without, flatten } from "lodash";
import { Point } from './point';

@Component({
  selector: "app-matrix",
  templateUrl: "./matrix.component.html",
  styleUrls: ["./matrix.component.sass"],
})
export class MatrixComponent implements OnInit {
  matrix: Point[][];
  readonly dueTime = 0;
  readonly period = 3000;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const nbColumns = +this.route.snapshot.queryParamMap.get("nbColumns");
    const nbRows = +this.route.snapshot.queryParamMap.get("nbRows");
    const colors = uniqueColors(nbRows);
    this.matrix = this.getMatrix(nbColumns, nbRows, colors);

    this.blinkRandom();
  }

  /**
   * Selects a random point from the matrix to blink every `period`
   */
  blinkRandom(): void {
    // Flatten the matrix to choose randomly from
    let flattenedMatrix = flatten(this.matrix);

    timer(this.dueTime, this.period)
      .pipe(takeWhile(() => !this.isListEmpty(flattenedMatrix)))
      .subscribe(() => {
        const randomPoint = this.getRandomPoint(flattenedMatrix);
        this.matrix[randomPoint.x][randomPoint.y].isBlinking = true;

        // Remove the randomly selected point from the flattened matrix
        flattenedMatrix = without(flattenedMatrix, randomPoint);
      });
  }

  /**
   * Returns true when the list is empty, false when not
   */
  isListEmpty(flattenedMatrix: Point[]): boolean {
    return flattenedMatrix.length === 0;
  }

  /**
   * Creates a matrix of points
   */
  getMatrix(nbColumns: number, nbRows: number, colors: string[]): Point[][] {
    const getPoint = (x: number, y: number): Point => ({ x, y, color: colors[x], isBlinking: false });
    const getPoints = (x: number): Point[] => range(nbColumns).map((y) => getPoint(x, y));

    return range(nbRows).map(getPoints);
  }

  /**
   * Returns a random point from the list
   */
  getRandomPoint(flattenedMatrix: Point[]): Point {
    return flattenedMatrix[Math.floor(Math.random() * flattenedMatrix.length)];
  }
}
