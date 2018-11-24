import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// import { Produce } from "../data/produce";
import { Produce } from "./produce.model";
import { Prods } from "../data/mock-produce";
import { DataService } from "../data.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-produce-list",
  templateUrl: "./produce-list.component.html",
  styleUrls: ["./produce-list.component.scss"]
})
export class ProduceListComponent implements OnInit {
  produceList: Produce[] = [];
  // testFetch: Object;
  // users$: Object;

  // hero = Prods;
  // @ViewChild("produceNameInput") produceInputRef: ElementRef;
  values: string = "";
  produce: string = "";
  name: string = "";
  prodToDel: Produce;

  constructor(private data: DataService) {}

  fetchProduce(): void {
    this.data.getItems().subscribe(data => {
      for (var key in data) {
        this.produceList.push(new Produce(data[key].name));
      }
    });
  }
  postProduceItem(produce: string) {
    let toPostProduce = new Produce(produce);
    let duplicate: boolean = false;
    for (var key in this.produceList) {
      if (this.produceList[key].name === toPostProduce.name) {
        duplicate = true;
      }
    }
    if (!duplicate && this.produce !== "") {
      this.produceList.push(toPostProduce);
      this.data.postProduce(toPostProduce).subscribe(data => console.log(data));
    } else if (this.produce === "") {
      alert("empty");
    } else {
      alert("dupe");
    }
  }

  deleteProduceItem(prodToDel: Produce) {
    console.log(prodToDel);
    this.produceList.splice(this.produceList.indexOf(prodToDel), 1);
    this.data.deleteProduce(prodToDel).subscribe(data => console.log(data));
  }

  ngOnInit() {
    this.fetchProduce();
    console.log(this.produceList);
  }

  onAddProduce(): void {
    this.postProduceItem(this.produce);
  }
}
