import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ProduceListComponent } from "./produce-list/produce-list.component";

import { HttpClientModule } from "@angular/common/http";
import { ListContainerComponent } from "./list-container/list-container.component";
import { ListContentComponent } from './list-container/list-content/list-content.component';

@NgModule({
  declarations: [AppComponent, ProduceListComponent, ListContainerComponent, ListContentComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
