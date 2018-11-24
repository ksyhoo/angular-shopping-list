import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Produce } from "./produce-list/produce.model";
import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get("http://localhost:8001/api/get_items");
  }
  getLists() {
    return this.http.get("http://localhost:8001/api/get_lists");
  }
  getUsers() {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }
  postProduce(toPostProduce: Produce) {
    return this.http.post("http://localhost:8001/api/insert_produce", { name: toPostProduce.name });
  }
  deleteProduce(toDeleteProduce: Produce) {
    const url = `http://localhost:8001/api/delete_produce/${toDeleteProduce.name}`;

    return this.http.delete(url, httpOptions);
  }
}
