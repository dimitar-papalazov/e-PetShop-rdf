import Member from "../model-layer/Member.js";
import oxigraph from "oxigraph";

export default class MemberService {
  constructor() {
    this.store = new oxigraph.Store();

    this.baseURI = "http://www.rdf-petshop.com/member/";
    this.usernames = [];
    this.members = [];
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

    member.triples.forEach((triple) => this.store.add(triple));

    this.members.push(member);

    return member.POJO;
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

    member.triples.forEach((triple) => this.store.add(triple));
  }

  removeMember(username) {
    if (!this.usernames.includes(username))
      throw "Username " + username + " doesn't exists!";

    const memeber = this.members.find((member) => member.username === username);

    this.store.delete(memeber);

    const index = this.usernames.indexOf(username);

    this.usernames.splice(index, 1);
    this.members.splice(index, 1);
  }

  query(queryString) {
    const subejcts = [];

    for (const binding of this.store.query(queryString)) {
      console.log(binding);
      subejcts.push(binding.get("s").value);
    }

    return this.membersFromResult(subejcts)[0];
  }

  membersFromResult(result) {
    const members = [];
    const addedId = [];

    result.forEach((v) => {
      this.members.forEach((m) => {
        if (m._id === v && !addedId.includes(v)) {
          members.push(m.POJO);
        }
        addedId.push(v);
      });
    });

    return members;
  }
}
