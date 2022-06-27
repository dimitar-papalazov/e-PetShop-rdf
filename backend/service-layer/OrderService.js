import MemDown from "memdown";
import { Quadstore } from "quadstore";
import { Engine } from "quadstore-comunica";
import { DataFactory } from "rdf-data-factory";
import Order from "../model-layer/Order";

export default class OrderService {
  constructor() {
    this.store = new Quadstore({
      backend: MemDown(),
      dataFactory: new DataFactory(),
    });

    this.baseURI = "http://www.rdf-petshop.com/order#";
    this.orderIds = [];
    this.orders = [];
  }

  open() {
    new Promise((resolve, reject) => {
      this.store.open().then(() => {
        this.engine = new Engine(this.store);
        resolve();
      });
    });
  }

  addOrder(
    id,
    dateOrder,
    member,
    phoneNumber,
    address,
    city,
    postalCode,
    toDoor,
    trackingNumber,
    products
  ) {
    if (this.orderIds.includes(id))
      throw "Order with id: " + id + " already exists!";

    this.orderIds.push(id);

    const order = new Order(
      id,
      dateOrder,
      member,
      phoneNumber,
      address,
      city,
      postalCode,
      toDoor,
      trackingNumber,
      products
    );

    order.quads.forEach((q) => {
      this.store.put(q);
    });

    this.orders.push(order);
  }

  editOrder(
    id,
    dateOrder,
    member,
    phoneNumber,
    address,
    city,
    postalCode,
    toDoor,
    trackingNumber,
    products
  ) {
    if (!this.orderIds.includes(id))
      throw "Order with id: " + id + " doesn't exists!";

    let order = this.orders.find((m) => m.id === id);

    if (typeof dateOrder === "undefined") dateOrder = order.dateOrder;
    if (typeof member === "undefined") member = order.member;
    if (typeof phoneNumber === "undefined") phoneNumber = order.phoneNumber;
    if (typeof address === "undefined") address = order.address;
    if (typeof city === "undefined") city = order.city;
    if (typeof postalCode === "undefined") postalCode = order.postalCode;
    if (typeof toDoor === "undefined") toDoor = order.toDoor;
    if (typeof trackingNumber === "undefined")
      trackingNumber = order.trackingNumber;
    if (typeof products === "undefined") products = order.products;

    this.store.removeMatches(id);

    order = new Order(
      id,
      dateOrder,
      member,
      phoneNumber,
      address,
      city,
      postalCode,
      toDoor,
      trackingNumber,
      products
    );

    order.quads.forEach((q) => {
      this.store.put(q);
    });
  }

  removeOrder(id) {
    if (!this.orderIds.includes(id))
      throw "Order with id: " + id + " doesn't exists!";

    this.store.removeMatches(id);

    const index = this.orderIds.indexOf(id);

    this.orderIds.splice(index, 1);
    this.orders.splice(index, 1);
  }

  query(queryString) {
    return this.engine
      .query(queryString)
      .then((query) => {
        return query.execute();
      })
      .then((bindingsStream) => {
        return bindingsStream.toArray();
      })
      .then((array) => {
        const result = array
          .map((v) => v.get("s"))
          .filter((v, i, a) => a.indexOf(v) === i);

        return this.ordersFromResult(result);
      });
  }

  ordersFromResult(result) {
    const orders = [];

    result.forEach((v) => {
      this.orders.forEach((o) => {
        if (o._id === v) orders.push(o.toPOJO());
      });
    });

    return orders;
  }
}
