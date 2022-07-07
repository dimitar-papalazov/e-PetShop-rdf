import oxigraph from "oxigraph";

export default class Order {
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
    this.triples = [];
    this._id = `http://www.rdf-petshop.com/order/${id}`;

    this.createId();
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

  createId() {
    this.id = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/id"),
      oxigraph.literal(this._id)
    );

    this.triples.push(this.id);
  }

  createDateOrder(dateOrder) {
    this.dateOrder = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/date"),
      oxigraph.literal(dateOrder)
    );

    this.triples.push(this.dateOrder);
  }

  createMember(member) {
    this.member = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/member"),
      oxigraph.literal(member)
    );

    this.triples.push(this.member);
  }

  createPhoneNumber(phoneNumber) {
    this.firstNaphoneNumberme = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/MobilePhone"),
      oxigraph.literal(phoneNumber)
    );

    this.triples.push(this.phoneNumber);
  }

  createAddress(address) {
    this.address = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/address"),
      oxigraph.literal(address)
    );

    this.triples.push(this.address);
  }

  createCity(city) {
    this.city = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/city"),
      oxigraph.literal(city)
    );

    this.triples.push(this.city);
  }

  createPostalCode(postalCode) {
    this.postalCode = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/postalCode"),
      oxigraph.literal(postalCode)
    );

    this.triples.push(this.postalCode);
  }

  createToDoor(toDoor) {
    this.toDoor = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/type"),
      oxigraph.literal(toDoor)
    );

    this.triples.push(this.toDoor);
  }

  createTrackingNumber(trackingNumber) {
    this.trackingNumber = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/trackNumber"),
      oxigraph.literal(trackingNumber)
    );

    this.triples.push(this.trackingNumber);
  }

  createProducts(products) {
    this.products = [];
    products.forEach((p) => {
      const product = oxigraph.triple(
        oxigraph.namedNode(this._id),
        oxigraph.namedNode("http://dbpedia.org/ontology/product"),
        oxigraph.literal(p)
      );

      this.products.push(product);
      this.triples.push(product);
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
    this.trackingNumber = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/trackNumber"),
      oxigraph.literal(trackingNumber)
    );

    this.add(this.trackingNumber);

    this.POJO.trackingNumber = trackingNumber;
  }
}
