import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatrixComponent } from './matrix/matrix.component';
import { BlinkerComponent } from './matrix/blinker/blinker.component';

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    BlinkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
