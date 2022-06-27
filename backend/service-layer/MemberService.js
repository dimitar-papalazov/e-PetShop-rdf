import MemDown from "memdown";
import { Quadstore } from "quadstore";
import { Engine } from "quadstore-comunica";
import { DataFactory } from "rdf-data-factory";
import Member from "../model-layer/Member";

export default class MemberService {
  constructor() {
    this.store = new Quadstore({
      backend: MemDown(),
      dataFactory: new DataFactory(),
    });

    this.baseURI = "http://www.rdf-petshop.com/member#";
    this.usernames = [];
    this.members = [];
  }

  open() {
    new Promise((resolve, reject) => {
      this.store.open().then(() => {
        this.engine = new Engine(this.store);
        resolve();
      });
    });
  }

  addMember(username, email, password, firstName, lastName, role) {
    if (this.usernames.includes(username))
      throw "Username " + username + " already exists!";

    this.usernames.push(username);

    const member = new Member(
      username,
      email,
      password,
      firstName,
      lastName,
      role
    );

    member.quads.forEach((q) => {
      this.store.put(q);
    });

    this.members.push(member);
  }

  editMember(username, email, password, firstName, lastName, role) {
    if (!this.usernames.includes(username))
      throw "Username " + username + " doesn't exists!";

    let member = this.members.find((m) => m.username === username);

    if (typeof email === "undefined") email = member.email;
    if (typeof password === "undefined") password = member.password;
    if (typeof firstName === "undefined") firstName = member.firstName;
    if (typeof lastName === "undefined") lastName = member.lastName;
    if (typeof role === "undefined") role = member.role;

    this.store.removeMatches(username);

    member = new Member(username, email, password, firstName, lastName, role);

    member.quads.forEach((q) => {
      this.store.put(q);
    });
  }

  removeMember(username) {
    if (!this.usernames.includes(username))
      throw "Username " + username + " doesn't exists!";

    this.store.removeMatches(username);

    const index = this.usernames.indexOf(username);

    this.usernames.splice(index, 1);
    this.members.splice(index, 1);
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

        return this.membersFromResult(result);
      });
  }

  membersFromResult(result) {
    const members = [];

    result.forEach((v) => {
      this.members.forEach((m) => {
        if (m._id === v) members.push(m.toPOJO());
      });
    });

    return members;
  }
}
