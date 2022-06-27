import MemDown from "memdown";
import { Quadstore } from "quadstore";
import { Engine } from "quadstore-comunica";
import { DataFactory } from "rdf-data-factory";
import Product from "../model-layer/Product";

export default class ProductService {
  constructor() {
    this.store = new Quadstore({
      backend: MemDown(),
      dataFactory: new DataFactory(),
    });

    this.baseURI = "http://www.rdf-petshop.com/product#";
    this.productIds = [];
    this.products = [];
  }

  open() {
    new Promise((resolve, reject) => {
      this.store.open().then(() => {
        this.engine = new Engine(this.store);
        resolve();
      });
    });
  }

  addProduct(id, type, imageUrl, price, name, quantity, sale, sold) {
    if (this.productIds.includes(id))
      throw "Product with id: " + id + " already exists!";

    this.productIds.push(id);

    const product = new Product(
      id,
      type,
      imageUrl,
      price,
      name,
      quantity,
      sale,
      sold
    );

    product.quads.forEach((q) => {
      this.store.put(q);
    });

    this.products.push(product);
  }

  editProduct(id, type, imageUrl, price, name, quantity, sale, sold) {
    if (!this.productIds.includes(id))
      throw "Product with id: " + id + " doesn't exists!";

    let product = this.products.find((m) => m.username === id);

    if (typeof type === "undefined") type = product.type;
    if (typeof imageUrl === "undefined") imageUrl = product.imageUrl;
    if (typeof price === "undefined") price = product.price;
    if (typeof name === "undefined") name = product.name;
    if (typeof quantity === "undefined") quantity = product.quantity;
    if (typeof sale === "undefined") sale = product.sale;
    if (typeof sold === "undefined") sold = product.sold;

    this.store.removeMatches(id);

    product = new Product(
      id,
      type,
      imageUrl,
      price,
      name,
      quantity,
      sale,
      sold
    );

    product.quads.forEach((q) => {
      this.store.put(q);
    });
  }

  removeProduct(id) {
    if (!this.productIds.includes(id))
      throw "Product with id: " + id + " doesn't exists!";

    this.store.removeMatches(id);

    const index = this.productIds.indexOf(id);

    this.productIds.splice(index, 1);
    this.products.splice(index, 1);
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

        return this.productsFromResult(result);
      });
  }

  productsFromResult(result) {
    const products = [];

    result.forEach((v) => {
      this.products.forEach((p) => {
        if (p._id === v) products.push(p.toPOJO());
      });
    });

    return products;
  }
}
