import oxigraph from "oxigraph";
import Order from "../model-layer/Order.js";

export default class OrderService {
  constructor() {
    this.store = new oxigraph.Store();

    this.baseURI = "http://www.rdf-petshop.com/order/";
    this.orderIds = [];
    this.orders = [];

    this.idCounter = 0;
    this.trackingNumberCounter = 0;
  }

  addOrder(
    dateOrder,
    member,
    phoneNumber,
    address,
    city,
    postalCode,
    toDoor,
    products
  ) {

    const id = this.idCounter++;

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
      this.trackingNumberCounter++,
      products
    );

    order.triples.forEach((q) => {
      this.store.add(q);
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

    this.removeOrder(id);

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
      this.store.add(q);
    });
  }

  removeOrder(id) {
    if (!this.orderIds.includes(id))
      throw "Order with id: " + id + " doesn't exists!";

    const order = this.orders.find((o) => o._id === id);

    this.store.delete(order);

    const index = this.orderIds.indexOf(id);

    this.orderIds.splice(index, 1);
    this.orders.splice(index, 1);
  }

  query(queryString) {
    const subejcts = [];

    for (const binding of this.store.query(queryString)) {
      subejcts.push(binding.get("s").value);
    }

    return this.ordersFromResult(subejcts);
  }

  ordersFromResult(result) {
    const orders = [];
    const addedId = [];

    result.forEach((v) => {
      this.orders.forEach((o) => {
        if (o._id === v && !addedId.includes(v)) {
          orders.push(o.POJO);
          addedId.push(v);
        }
      });
    });

    return orders;
  }
}
