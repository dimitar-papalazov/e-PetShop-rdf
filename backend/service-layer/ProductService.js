import oxigraph from "oxigraph";
import Product from "../model-layer/Product.js";

export default class ProductService {
  constructor() {
    this.store = new oxigraph.Store();

    this.baseURI = "http://www.rdf-petshop.com/product/";
    this.productIds = [];
    this.products = [];
    this.idCounter = 0;
  }

  addProduct(type, imageUrl, name, price, quantity, sale, sold) {
    const id = this.idCounter++;

    this.productIds.push(id);

    const product = new Product(
      id,
      type,
      imageUrl,
      name,
      price,
      quantity,
      sale,
      sold
    );

    product.triples.forEach((q) => {
      this.store.add(q);
    });

    this.products.push(product);

    return product.POJO;
  }

  editProduct(id, type, imageUrl, name, price, quantity, sale, sold) {
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

    this.removeProduct(id);

    product = new Product(
      id,
      type,
      imageUrl,
      name,
      price,
      quantity,
      sale,
      sold
    );

    product.quads.forEach((q) => {
      this.store.add(q);
    });
  }

  removeProduct(id) {
    if (!this.productIds.includes(id))
      throw "Product with id: " + id + " doesn't exists!";

    const product = this.products.find((product) => product._id === id);

    this.store.delete(product);

    const index = this.productIds.indexOf(id);

    this.productIds.splice(index, 1);
    this.products.splice(index, 1);
  }

  query(queryString) {
    const subejcts = [];

    for (const binding of this.store.query(queryString)) {
      subejcts.push(binding.get("s").value);
    }

    return this.productsFromResult(subejcts);
  }

  productsFromResult(result) {
    const products = [];
    const addedId = [];

    result.forEach((v) => {
      this.products.forEach((p) => {
        if (p._id === v && !addedId.includes(v)) {
          products.push(p.POJO);
          addedId.push(v);
        }
      });
    });

    return products;
  }
}
