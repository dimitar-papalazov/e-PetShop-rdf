import DatasetCore from "@rdfjs/dataset/DatasetCore.js";
import { DefaultGraph, Quad } from "rdf-data-factory";

export default class Product extends DatasetCore {
  constructor(id, type, imageUrl, price, name, quantity, sale, sold) {
    super();
    this.quads = [];
    this._id = `http://www.rdf-petshop.com/product#${id}`;

    this.createType(type);
    this.createImageUrl(imageUrl);
    this.createPrice(price);
    this.createName(name);
    this.createQuantity(quantity);
    this.createSale(sale);
    this.createSold(sold);
    this.createPOJO(id, type, imageUrl, price, name, quantity, sale, sold);

  }

  createType(type) {
    this.type = new Quad(
      this._id,
      "http://dbpedia.org/ontology/type",
      type,
      new DefaultGraph()
    );

    this.quads.push(this.type);
  }

  createImageUrl(imageUrl) {
    this.imageUrl = new Quad(
      this._id,
      "http://dbpedia.org/property/image",
      imageUrl,
      new DefaultGraph()
    );

    this.quads.push(this.imageUrl);
  }

  createPrice(price) {
    this.price = new Quad(
      this._id,
      "http://dbpedia.org/property/price",
      price,
      new DefaultGraph()
    );

    this.quads.push(this.price);
  }

  createName(name) {
    this.name = new Quad(
      this._id,
      "http://dbpedia.org/property/name",
      name,
      new DefaultGraph()
    );

    this.quads.push(this.name);
  }

  createQuantity(quantity) {
    this.quantity = new Quad(
      this._id,
      "http://dbpedia.org/property/amount",
      quantity,
      new DefaultGraph()
    );

    this.quads.push(this.quantity);
  }

  createSale(sale) {
    this.sale = new Quad(
      this._id,
      "http://dbpedia.org/property/sale",
      sale,
      new DefaultGraph()
    );

    this.quads.push(this.sale);
  }

  createSold(sold) {
    this.sold = new Quad(
      this._id,
      "http://dbpedia.org/ontology/numberSold",
      sold,
      new DefaultGraph()
    );

    this.quads.push(this.sold);
  }

  createPOJO(id, type, imageUrl, price, name, quantity, sale, sold) {
    this.POJO = {
      id,
      type,
      imageUrl,
      price,
      name,
      quantity,
      sale,
      sold,
    };
  }
}
