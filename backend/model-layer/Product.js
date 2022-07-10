import oxigraph from "oxigraph";

export default class Product {
  constructor(id, type, imageUrl, name, price, quantity, sale, sold) {
    this.triples = [];
    this._id = `http://www.rdf-petshop.com/product/${id}`;

    this.createId();
    this.createType(type);
    this.createImageUrl(imageUrl);
    this.createPrice(price);
    this.createName(name);
    this.createQuantity(quantity);
    this.createSale(sale);
    this.createSold(sold);
    this.createPOJO(id, type, imageUrl, price, name, quantity, sale, sold);
  }

  createId() {
    this.id = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/id"),
      oxigraph.literal(this._id)
    );

    this.triples.push(this.id);
  }

  createType(type) {
    this.type = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/type"),
      oxigraph.literal(`${type}`)
    );

    this.triples.push(this.type);
  }

  createImageUrl(imageUrl) {
    this.imageUrl = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/image"),
      oxigraph.literal(imageUrl)
    );

    this.triples.push(this.imageUrl);
  }

  createPrice(price) {
    this.price = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/price"),
      oxigraph.literal(`${price}`)
    );

    this.triples.push(this.price);
  }

  createName(name) {
    this.name = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/name"),
      oxigraph.literal(name)
    );

    this.triples.push(this.name);
  }

  createQuantity(quantity) {
    this.quantity = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/amount"),
      oxigraph.literal(`${quantity}`)
    );

    this.triples.push(this.quantity);
  }

  createSale(sale) {
    this.sale = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/sale"),
      oxigraph.literal(`${sale}`)
    );

    this.triples.push(this.sale);
  }

  createSold(sold) {
    this.sold = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/numberSold"),
      oxigraph.literal(`${0}`)
    );

    this.triples.push(this.sold);
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
