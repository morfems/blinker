import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { merge, Observable, timer } from "rxjs";
import { mapTo, skipWhile } from "rxjs/operators";

@Component({
  selector: "app-blinker",
  templateUrl: "./blinker.component.html",
  styleUrls: ["./blinker.component.sass"],
})
export class BlinkerComponent implements OnInit {
  @HostBinding("style.visibility")
  private visibility = "hidden";

  @Input() active: boolean;
  @Input() color: string;

  private readonly blinker$ = this.getBlinker();

  ngOnInit() {
    this.blink();
  }

  /**
   * Returns an observable that alternates between 'visible' and 'hidden'
   */
  getBlinker(): Observable<string> {
    const inVisibleMS = this.getRandomBetween(250, 350);
    const visibleMS = 0;
    const show$ = timer(visibleMS, inVisibleMS * 2);
    const hide$ = timer(inVisibleMS, inVisibleMS * 2);

    return merge(show$.pipe(mapTo("visible")), hide$.pipe(mapTo("hidden")));
  }

  /**
   * Blinks when this.active becomes true
   */
  blink(): void {
    this.blinker$
      .pipe(skipWhile(() => !this.active))
      .subscribe((newVisiblity: string) => (this.visibility = newVisiblity));
  }

  /**
   * Returns a random number between min and max
   */
  getRandomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
