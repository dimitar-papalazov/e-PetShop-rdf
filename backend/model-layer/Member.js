import oxigraph from "oxigraph";

export default class Member {
  constructor(username, email, password, firstName, lastName, role) {
    this.triples = [];
    this._id = `http://www.rdf-petshop.com/member/${username}`;

    this.createId();
    this.createEmail(email);
    this.createPassword(password);
    this.createFirstName(firstName);
    this.createLastName(lastName);
    this.createRole(role);
    this.createPOJO(username, email, password, firstName, lastName, role);
  }

  createId() {
    this.id = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/id"),
      oxigraph.literal(this._id)
    );

    this.triples.push(this.id);
  }

  createEmail(email) {
    this.email = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/email"),
      oxigraph.literal(email)
    );

    this.triples.push(this.email);
  }

  createPassword(password) {
    this.password = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/password"),
      oxigraph.literal(password)
    );

    this.triples.push(this.password);
  }

  createFirstName(firstName) {
    this.firstName = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/property/firstname"),
      oxigraph.literal(firstName)
    );

    this.triples.push(this.firstName);
  }

  createLastName(lastName) {
    this.lastName = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/lastname"),
      oxigraph.literal(lastName)
    );

    this.triples.push(this.lastName);
  }

  createRole(role) {
    this.role = oxigraph.triple(
      oxigraph.namedNode(this._id),
      oxigraph.namedNode("http://dbpedia.org/ontology/role"),
      oxigraph.literal(`${role}`)
    );

    this.triples.push(this.role);
  }

  createPOJO(username, email, password, firstName, lastName, role) {
    this.POJO = {
      username,
      email,
      password,
      firstName,
      lastName,
      role,
    };
  }
}
