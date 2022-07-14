import express from "express";
import { Server } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import MemberService from "../service-layer/MemberService.js";
import OrderService from "../service-layer/OrderService.js";
import ProductService from "../service-layer/ProductService.js";
import productTypes from "../model-layer/ProductType.enum.js";

const app = express();
const server = new Server(app);
const port = 8000;
const baseUrl = "/api";

app.use(cors());
app.use(bodyParser.json());

const memberService = new MemberService();
const orderService = new OrderService();
const productService = new ProductService();

server.listen(port, () => {
  console.log("Server at", port);
  initData();
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

  res.send({ ...member });
});

app.get(baseUrl + "/members/login", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;

  const member = memberService.query(`
  SELECT ?s 
  WHERE { 
    ?s <http://dbpedia.org/ontology/password> "${password}" .
  }
  `);

  res.send(member[0]);
});

app.get(baseUrl + "/orders", function (req, res) {
  const username = req.query.username;
  let query = null;

  if (username === undefined) {
    query = `
    SELECT ?s 
    WHERE { 
      ?s ?p ?o
    }
    `;
  } else {
    query = `
    SELECT ?s 
    WHERE { 
      ?s <http://dbpedia.org/ontology/member> "${
        username
      }" .
    }
    `;
  }

  const orders = orderService.query(query);
  res.send(orders);
});

app.post(baseUrl + "/orders/save", function (req, res) {
  const orderConfig = req.body;

  const order = orderService.addOrder(
    new Date(),
    orderConfig.member,
    orderConfig.phoneNumber,
    orderConfig.address,
    orderConfig.city,
    orderConfig.postalCode,
    orderConfig.toDoor,
    orderConfig.products
  );

  res.send({ order });
});

app.post(baseUrl + "/orders/edit", function (req, res) {
  const number = req.query.number;
  const id = req.query.id;

  const order = orderService.editOrder(
    id,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    number,
    undefined
  );

  res.send({ order });
});

app.get(baseUrl + "/products", function (req, res) {
  let query = `
  SELECT ?s 
  WHERE { 
    ?s ?p ?o .
  }
  `;

  const products = productService.query(query);
  res.send(products);
});

app.get(baseUrl + "/products/most-selling", function (req, res) {
  let query = `
  SELECT ?s 
  WHERE { 
    ?s <http://dbpedia.org/ontology/numberSold> ?sold .
  } ORDER BY DESC(?sold) LIMIT 6
  `;

  const products = productService.query(query);
  res.send(products);
});

app.get(baseUrl + "/products/details", function (req, res) {
  const id = req.query.id;
  let query = `
  SELECT ?s 
  WHERE { 
    ?s <http://dbpedia.org/ontology/id> "${productService.baseURI + id}" .
  }
  `;
  const products = productService.query(query);
  res.send(products[0]);
});

app.get(baseUrl + "/products/similar", function (req, res) {
  const id = req.query.id;
  let query = `
  SELECT ?s 
  WHERE { 
    <${productService.baseURI + id}> <http://dbpedia.org/ontology/type> ?type .
    ?s <http://dbpedia.org/ontology/type> ?type .
    FILTER(?s != <${productService.baseURI + id}>)
  } LIMIT 4
  `;
  const products = productService.query(query);
  res.send(products);
});

app.post(baseUrl + "/products/add", function (req, res) {
  const productConfig = req.body;
  const product = productService.addProduct(
    productConfig.type,
    productConfig.imageUrl,
    productConfig.name,
    productConfig.price,
    productConfig.quantity,
    productConfig.sale,
    productConfig.sold
  );
  res.send({ product });
});

app.post(baseUrl + "/products/edit", function (req, res) {
  const id = req.query.id;
  const product = productService.editProduct(
    id,
    productConfig.type,
    productConfig.imageUrl,
    productConfig.price,
    productConfig.name,
    productConfig.quantity,
    productConfig.sale,
    productConfig.sold
  );
  res.send({ product });
});

app.post(baseUrl + "/products/delete", function (req, res) {
  const id = req.query.id;
  productService.removeProduct(id);
  res.send({});
});

function initData() {
  const dogFood = productService.addProduct(
    productTypes.DOGS,
    "https://prijateli5.com/wp-content/uploads/2020/11/advance-medium-puppy.jpg",
    "Храна за куче",
    340.0,
    10,
    0
  );
  const dogToy = productService.addProduct(
    productTypes.DOGS,
    "https://prijateli5.com/wp-content/uploads/2016/05/trixie-dwie-miski-045l-na-stojaku-24831-.jpg",
    "Сад за храна за куче",
    390.0,
    10,
    0
  );
  const dogStrap = productService.addProduct(
    productTypes.DOGS,
    "https://prijateli5.com/wp-content/uploads/2016/05/280-1.jpg",
    "Ремче за куче",
    490.0,
    10,
    0
  );
  const catFood = productService.addProduct(
    productTypes.CATS,
    "https://prijateli5.com/wp-content/uploads/2020/03/88000814_2776330202451122_5431583167720980480_n.jpg",
    "Храна за маче",
    40.0,
    10,
    0
  );
  const catToy = productService.addProduct(
    productTypes.CATS,
    "https://prijateli5.com/wp-content/uploads/2020/06/gluvcinja.jpg",
    "Играчка за маче",
    170.0,
    10,
    0
  );
  const catScratcher = productService.addProduct(
    productTypes.CATS,
    "https://prijateli5.com/wp-content/uploads/2021/02/rb-038.jpg",
    "Гребалка за маче",
    1200.0,
    1,
    18
  );
  productService.addProduct(
    productTypes.RODENTS,
    "https://prijateli5.com/wp-content/uploads/2019/04/MANITOBA-MIX-CONIGLIETTO-1-KG-extra-big-9487-547.jpg",
    "Храна за зајак",
    200.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.BIRDS,
    "https://prijateli5.com/wp-content/uploads/2019/04/poilka-za-glodari-100ml-sifra-60521-cena-140-den-zemja-germanija.jpg",
    "Поилка за птици",
    140.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.BIRDS,
    "https://prijateli5.com/wp-content/uploads/2020/12/zvp2100.jpg",
    "Храна за птици",
    210.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.BIRDS,
    "https://prijateli5.com/wp-content/uploads/2019/04/2512-thickbox_default-Kafez-za-ptici-set-Fop-10410011.jpg",
    "Кафез за птици",
    1900.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.BIRDS,
    "https://prijateli5.com/wp-content/uploads/2016/05/223.jpg",
    "Сад за храна за птици",
    120.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.AQUA,
    "https://prijateli5.com/wp-content/uploads/2019/04/akvarium-2.jpg",
    "Аквариум за риби",
    1500.0,
    10,
    0
  );
  productService.addProduct(
    productTypes.AQUA,
    "https://prijateli5.com/wp-content/uploads/2016/05/at-202.jpg",
    "Пумпа за аквариум за риби",
    1090.0,
    10,
    0
  );
  const admin = memberService.addMember(
    "admin",
    "epetshop.project@gmail.com",
    "admin",
    "admin",
    "admin",
    0
  );
  const dp = memberService.addMember(
    "blabla",
    "d.papalazov@outlook.com",
    "blabla",
    "Dimitar",
    "Papalazov",
    1
  );
  const as = memberService.addMember(
    "as",
    "yourpapauniverse@gmail.com",
    "as",
    "Angela",
    "Sotirovska",
    1
  );
  const dpProducts = [];
  dpProducts.push(catScratcher.id);
  dpProducts.push(catFood.id);
  dpProducts.push(catToy.id);
  const asProducts = [];
  asProducts.push(dogFood.id);
  asProducts.push(dogToy.id);
  orderService.addOrder(
    new Date(),
    dp.username,
    "+38975835665",
    "Krume Kepeski 26",
    "Bitola",
    "7000",
    true,
    dpProducts
  );
  orderService.addOrder(
    new Date(),
    as.username,
    "+38970000000",
    "Ulica ulica 13",
    "Skopje",
    "0000",
    false,
    asProducts
  );
}
