import express from "express";
import { Server } from "http";
import bodyParser from "body-parser";
import MemberService from "../service-layer/MemberService.js";
import OrderService from "../service-layer/OrderService.js";
import ProductService from "../service-layer/ProductService.js";
import productTypes from "../model-layer/ProductType.enum.js";

const app = express();
const server = new Server(app);
const port = 8000;
const baseUrl = "/api";

app.use(bodyParser.json());

const memberService = new MemberService();
const orderService = new OrderService();
const productService = new ProductService();

server.listen(port, () => {
  console.log("Server at", port);
});

app.get(baseUrl + "/products/types", function (req, res) {
  res.send(Object.keys(productTypes));
});

app.post(baseUrl + "/members/registration", function (req, res) {
  const memberConfig = req.body;

  const member = memberService.addMember(
    memberConfig.username,
    memberConfig.email,
    memberConfig.password,
    memberConfig.firstName,
    memberConfig.lastName,
    memberConfig.role
  );

  res.send({ member });
});

app.get(baseUrl + "/members/login", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  const member = memberService.query(`
  SELECT ?s 
  WHERE { 
    ?s <http://dbpedia.org/ontology/id> "${memberService.baseURI + username}" .
    ?s <http://dbpedia.org/ontology/password> "${password}" .
  }
  `);

  res.send(member);
});
