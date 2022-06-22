import { DataFactory } from 'n3';
import { Store } from 'n3';
import { Writer } from 'n3';

const {namedNode, literal, defaultGraph, quad} = DataFactory;

const myQuad = quad(
  namedNode('http://example.org/cartoons#Tom'),
  namedNode('http://example.org/cartoons#name'),
  literal('Tom'),
  defaultGraph(),
);

console.log(myQuad.termType);              
console.log(myQuad.value);                 
console.log(myQuad.subject.value);         
console.log(myQuad.object.value);          
console.log(myQuad.object.datatype.value); 
console.log(myQuad.object.language);

const store = new Store();

store.add(myQuad);

console.log(store)

const writer = new Writer({ prefixes: { c: 'http://example.org/cartoons#' } });
writer.addQuad(store.getQuads()[0]);
writer.end((error, result) => {
  
});