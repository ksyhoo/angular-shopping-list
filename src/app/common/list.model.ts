import { Produce } from "./produce.model";

export class ProduceList {
  public name: string;
  public items: Array<Produce>;
  constructor(name: string, items: Array<Produce>) {
    this.name = name;
    this.items = items;
  }

  addProduce(produce: Produce) {
    this.items.push(produce);
  }
  removeProduce(produce: Produce) {
    this.items.splice(this.items.indexOf(produce), 1);
  }
}
