import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BlinkerComponent } from './blinker/blinker.component';

import { MatrixComponent } from './matrix.component';
import { Point } from './point';

describe('MatrixComponent', () => {
  let component: MatrixComponent;
  let fixture: ComponentFixture<MatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixComponent, BlinkerComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { queryParamMap: { get: () => 0 } } }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getMatrix', () => {
    it('should return an empty matrix', () => {
      // Given
      const nbColumns = 0;
      const nbRows = 0;
      const colors = [];
      const expectedResult = [];

      // When
      const matrix = component.getMatrix(nbColumns, nbRows, colors)

      // Then
      expect(matrix).toEqual(expectedResult);
    });

    it('should return the right matrix of 2x2', () => {
      // Given
      const nbColumns = 2;
      const nbRows = 2;
      const colors = ['red', 'orange'];
      const expectedResult = [
        [
          { x: 0, y: 0, color: 'red', isBlinking: false },
          { x: 0, y: 1, color: 'red', isBlinking: false }
        ],
        [
          { x: 1, y: 0, color: 'orange', isBlinking: false },
          { x: 1, y: 1, color: 'orange', isBlinking: false }
        ]
      ];

      // When
      const matrix = component.getMatrix(nbColumns, nbRows, colors)

      // Then
      expect(matrix).toEqual(expectedResult);
    });
  });

  describe('getRandomPoint', () => {
    beforeEach(() => {
      spyOn(Math, 'random').and.returnValue(0.1);
    });

    it("should return undefined when the list is empty", () => {
      // Given
      const expectedResult: Point = undefined;

      // When
      const randomPoint: Point = component.getRandomPoint([]);

      // Then
      expect(randomPoint).toEqual(expectedResult);
    });

    it("should return a random point from the list", () => {
      // Given
      const point1 = { x: 0, y: 0, color: 'red', isBlinking: false };
      const point2 = { x: 0, y: 1, color: 'red', isBlinking: false };
      const expectedResult: Point = point1;

      // When
      const randomPoint: Point = component.getRandomPoint([point1, point2]);

      // Then
      expect(randomPoint).toEqual(expectedResult);
    });
  });

  describe('isListEmpty', () => {
    it("should return true when the list is empty", () => {
      // Given
      const expectedResult = true;

      // When
      const isListEmpty: boolean = component.isListEmpty([]);

      // Then
      expect(isListEmpty).toEqual(expectedResult);
    });

    it("should return false when the list is not empty", () => {
      // Given
      const point1 = { x: 0, y: 0, color: 'red', isBlinking: false };
      const expectedResult = false;

      // When
      const isListEmpty: boolean = component.isListEmpty([point1]);

      // Then
      expect(isListEmpty).toEqual(expectedResult);
    });
  });
});
