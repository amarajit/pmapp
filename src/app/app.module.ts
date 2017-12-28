import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjmanModule } from './projman/projman.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProjmanModule,
    HttpModule,
    RouterModule.forRoot([])
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
