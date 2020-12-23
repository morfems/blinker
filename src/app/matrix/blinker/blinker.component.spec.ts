import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinkerComponent } from './blinker.component';

describe('BlinkerComponent', () => {
  let component: BlinkerComponent;
  let fixture: ComponentFixture<BlinkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlinkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getRandomBetween', () => {
    beforeEach(() => {
      spyOn(Math, 'random').and.returnValue(0.5);
    });

    it("should return min/max when min and max are the same", () => {
      // Given
      const min = 100;
      const max = 100;
      const expectedResult = 100;

      // When
      const randomPoint: number = component.getRandomBetween(min, max);

      // Then
      expect(randomPoint).toEqual(expectedResult);
    });

    it("should return a random number between 100 and 200", () => {
      // Given
      const min = 100;
      const max = 200;
      const expectedResult = 150;

      // When
      const randomPoint: number = component.getRandomBetween(min, max);

      // Then
      expect(randomPoint).toEqual(expectedResult);
    });
  });
});
