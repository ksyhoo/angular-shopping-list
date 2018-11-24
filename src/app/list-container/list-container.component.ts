import { Component, OnInit } from "@angular/core";
import { ProduceList } from "../common/list.model";
import { Produce } from "../common/produce.model";
import { DataService } from "../data.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-list-container",
  templateUrl: "./list-container.component.html",
  styleUrls: ["./list-container.component.scss"]
})
export class ListContainerComponent implements OnInit {
  list: ProduceList = new ProduceList("lista", []);
  produce: string = "";
  listOfLists: ProduceList[] = [];

  constructor(private data: DataService) {}

  fetchProduce(): void {
    this.data.getItems().subscribe(data => {
      for (var key in data) {
        this.list.addProduce(new Produce(data[key].name));
      }
    });
  }

  fetchLists(): void {
    this.data.getLists().subscribe(data => {
      for (var key in data[0].lists) {
        this.listOfLists.push(new ProduceList(data[0].lists[key].name, []));
        // this.listOfLists[0].addProduce(new Produce(data[0].lists[0].items[key].name));
        for (var produce in data[0].lists[key].items) {
          this.listOfLists[key].addProduce(new Produce(data[0].lists[key].items[produce].name));
        }

        // for (var item in data[0].lists[0].items) {
        //   // console.log(data[0].lists[0].items);
        //   this.listOfLists[0].addProduce(new Produce(data[0].lists[0].items[item].name));
        //   console.log(this.listOfLists);
        // }
      }
      console.log(this.listOfLists);

      // console.log("l", this.listOfLists, "d", this.data);
    });
  }

  postProduceItem(produce: string) {
    let toPostProduce = new Produce(produce);
    let duplicate: boolean = false;
    for (var key in this.list) {
      if (this.list[key].name === toPostProduce.name) {
        duplicate = true;
      }
    }
    if (!duplicate && this.produce !== "") {
      this.list.addProduce(toPostProduce);
      this.data.postProduce(toPostProduce).subscribe(data => console.log(data));
    } else if (this.produce === "") {
      alert("empty");
    } else {
      alert("dupe");
    }
  }

  deleteProduceItem(prodToDel: Produce) {
    this.list.removeProduce(prodToDel);
    this.data.deleteProduce(prodToDel).subscribe(data => console.log(data));
  }

  onAddProduce(): void {
    this.postProduceItem(this.produce);
  }

  ngOnInit() {
    this.fetchProduce();
    this.fetchLists();
  }
}
