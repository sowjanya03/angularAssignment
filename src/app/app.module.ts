import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocComponent } from './doc/doc.component';
import { Doctor } from './shared/doctor.model';
import { SortByNamesPipe } from './shared/sort-by-names.pipe';
import { SortByIdsPipe } from './shared/sort-by-ids.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DocComponent,
    SortByNamesPipe,
    SortByIdsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [Doctor, SortByNamesPipe, SortByIdsPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
