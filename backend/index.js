import MemDown from 'memdown';
import { DataFactory } from 'rdf-data-factory';
import { Quadstore } from 'quadstore/dist/lib/quadstore.js';
import { Engine } from 'quadstore-comunica';

const backend = MemDown();
const dataFactory = new DataFactory();
const store = new Quadstore({ backend, dataFactory });

store.open()
  .then(() => {
    const engine = new Engine(store);

    store.put(dataFactory.quad(
      dataFactory.namedNode('http://example.com/subject'),
      dataFactory.namedNode('http://example.com/predicate'),
      dataFactory.namedNode('http://example.com/object'),
      dataFactory.defaultGraph(),
    ));
    store.put(dataFactory.quad(
      dataFactory.namedNode('http://example.com/a'),
      dataFactory.namedNode('http://example.com/a'),
      dataFactory.namedNode('http://example.com/a'),
      dataFactory.defaultGraph(),
    ));
    store.put(dataFactory.quad(
      dataFactory.namedNode('http://example.com/b'),
      dataFactory.namedNode('http://example.com/b'),
      dataFactory.namedNode('http://example.com/b'),
      dataFactory.defaultGraph(),
    ));

    return engine.query('SELECT ?s { ?s ?p ?o}');
  })
  .then(query => {
    return query.execute();
  })
  .then(bindingsStream => {
    return bindingsStream.toArray();
  })
  .then(array => {
    array.forEach((a, i) => {
      console.log(i, a.get("s").value)
    })
  });

//https://github.com/belayeng/quadstore
//https://comunica.dev/docs/query/getting_started/query_app/
