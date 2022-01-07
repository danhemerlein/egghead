console.log('hello from typescript');

type Salutation = {greeting:string, name?:string}

// ? after parameter means optional
function greet({greeting, name}:Salutation) {
  return `${greeting}, ${name}`;
}

const message:string = greet({greeting: "Hello" });

const danMessage:string = greet({greeting: "Howdy", name: "Dan"});

console.log(message)
console.log(danMessage)

