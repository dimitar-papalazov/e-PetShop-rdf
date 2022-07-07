import DatasetCore from "@rdfjs/dataset/DatasetCore.js";
import { DefaultGraph, Quad } from "rdf-data-factory";

export default class Order extends DatasetCore {
  constructor(
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
    super();
    this.quads = [];
    this._id = `http://www.rdf-petshop.com/order#${id}`;

    this.createMember(member);
    this.createPhoneNumber(phoneNumber);
    this.createAddress(address);
    this.createCity(city);
    this.createPostalCode(postalCode);
    this.createToDoor(toDoor);
    this.createDateOrder(dateOrder);
    this.createProducts(products);

    if (typeof trackingNumber !== "undefined")
      this.createTrackingNumber(trackingNumber);

    this.createPOJO(
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
  }

  createDateOrder(dateOrder) {
    this.dateOrder = new Quad(
      this._id,
      "http://dbpedia.org/ontology/date",
      dateOrder,
      new DefaultGraph()
    );

    this.quads.push(this.dateOrder);
  }

  createMember(member) {
    this.member = new Quad(
      this._id,
      "http://dbpedia.org/ontology/member",
      member,
      new DefaultGraph()
    );

    this.quads.push(this.member);
  }

  createPhoneNumber(phoneNumber) {
    this.firstNaphoneNumberme = new Quad(
      this._id,
      "http://dbpedia.org/ontology/MobilePhone",
      phoneNumber,
      new DefaultGraph()
    );

    this.quads.push(this.phoneNumber);
  }

  createAddress(address) {
    this.address = new Quad(
      this._id,
      "http://dbpedia.org/ontology/address",
      address,
      new DefaultGraph()
    );

    this.quads.push(this.address);
  }

  createCity(city) {
    this.city = new Quad(
      this._id,
      "http://dbpedia.org/ontology/city",
      city,
      new DefaultGraph()
    );

    this.quads.push(this.city);
  }

  createPostalCode(postalCode) {
    this.postalCode = new Quad(
      this._id,
      "http://dbpedia.org/ontology/postalCode",
      postalCode,
      new DefaultGraph()
    );

    this.quads.push(this.postalCode);
  }

  createToDoor(toDoor) {
    this.toDoor = new Quad(
      this._id,
      "http://dbpedia.org/ontology/type",
      toDoor,
      new DefaultGraph()
    );

    this.quads.push(this.toDoor);
  }

  createTrackingNumber(trackingNumber) {
    this.trackingNumber = new Quad(
      this._id,
      "http://dbpedia.org/ontology/trackNumber",
      trackingNumber,
      new DefaultGraph()
    );

    this.quads.push(this.trackingNumber);
  }

  createProducts(products) {
    this.products = [];
    products.forEach((p) => {
      const product = new Quad(
        this._id,
        "http://dbpedia.org/ontology/product",
        p,
        new DefaultGraph()
      );

      this.products.push(p);
      this.quads.push(p);
    });
  }

  createPOJO(
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
    this.POJO = {
      id,
      dateOrder,
      member,
      phoneNumber,
      address,
      city,
      postalCode,
      toDoor,
      trackingNumber,
      products,
    };
  }

  setTrackingNumber(trackingNumber) {
    this.trackingNumber = new Quad(
      this._id,
      "http://dbpedia.org/ontology/trackNumber",
      trackingNumber,
      new DefaultGraph()
    );

    this.add(this.trackingNumber);

    this.POJO.trackingNumber = trackingNumber;
  }
}
