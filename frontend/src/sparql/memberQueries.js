import ParsingClient from "sparql-http-client/ParsingClient" 

const endpoint = "http://localhost:5000/api/members/members.rdf"
// const endpoint = "http://dbpedia.org"
const q = `
PREFIX xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
PREFIX xmlns:j.0="http://www.w3.org/2006/vcard/ns#"
PREFIX xmlns:j.1="http://xmlns.com/foaf/0.1/">

SELECT ?subject ?predicate ?object
WHERE {?subject ?predicate ?object} 
LIMIT 1`;

const client = new ParsingClient({endpointUrl: endpoint});

async function query() {
  // return 0;
  const stream = await client.query.select(q, {
    headers: {
      accept: 'application/sparql-results+xml'
    }
  })
  // stream.forEach(row => 
  //   Object.entries(row).forEach(([key, value]) => {
  //     console.log(`${key}: ${value.value} (${value.termType})`)
  //   })
  // )
  stream.text()

  // stream.on("data", row => {
  //   Object.entries(row).forEach(([key, value]) => {
  //     console.log(`${key}: ${value.value} (${value.termType})`)
  //   })
  // })
}

export default query;
