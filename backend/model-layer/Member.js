import DatasetCore from "@rdfjs/dataset/DatasetCore";
import { DefaultGraph, Quad } from "rdf-data-factory";

export default class Member extends DatasetCore {
  constructor(username, email, password, firstName, lastName, role) {
    this.quads = [];
    this._id = `http://www.rdf-petshop.com/member#${username}`;

    this.createEmail(email);
    this.createPassword(password);
    this.createFirstName(firstName);
    this.createLastName(lastName);
    this.createRole(role);
    this.createPOJO(username, email, password, firstName, lastName, role);

    super(this.quads);
  }

  createEmail(email) {
    this.email = new Quad(
      this._id,
      "http://dbpedia.org/property/email",
      email,
      new DefaultGraph()
    );

    this.quads.push(this.email);
  }

  createPassword(password) {
    this.password = new Quad(
      this._id,
      "http://dbpedia.org/ontology/password",
      password,
      new DefaultGraph()
    );

    this.quads.push(this.password);
  }

  createFirstName(firstName) {
    this.firstName = new Quad(
      this._id,
      "http://dbpedia.org/property/firstname",
      firstName,
      new DefaultGraph()
    );

    this.quads.push(this.firstName);
  }

  createLastName(lastName) {
    this.lastName = new Quad(
      this._id,
      "http://dbpedia.org/ontology/lastname",
      lastName,
      new DefaultGraph()
    );

    this.quads.push(this.lastName);
  }

  createRole(role) {
    this.role = new Quad(
      this._id,
      "http://dbpedia.org/ontology/role",
      role,
      new DefaultGraph()
    );

    this.quads.push(this.role);
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
