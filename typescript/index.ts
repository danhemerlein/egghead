console.log('hello from typescript');
import _ from "lodash";

type Salutation = {greeting:string, name?:string}

// ? after parameter means optional
function greet({greeting, name}:Salutation) {
  return `${greeting}, ${name}`;
}

const message:string = greet({greeting: "Hello" });

const danMessage:string = greet({greeting: "Howdy", name: "Dan"});

console.log(message)
console.log(danMessage)

const input = document.getElementById('text-input') as HTMLInputElement;

input.autofocus = true;

input.addEventListener("input", event => {
  const i = event.currentTarget as HTMLInputElement
  console.log(i.value);
});


function fill<T>(array:any[], value:T):T {
  return array.map(() => value)
}

const result = fill([1,2,3], "a");

console.log(result);

result.map(x => x.toUpperCase());

console.log(result);

const resultTwo = fill(['a', 'b', 'c'], 4);

console.log(resultTwo);

console.log(_.uniq([1,1,2]));
