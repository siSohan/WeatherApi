"use stric";
console.log("Worked");

let data = ["maruf", "sohan", "sujal", "reduwan", "blabla"];

const makeNew = (arr, data) => {
  const up = arr.map((el, i, arr) => {
    if (data === el) {
      arr.splice(i, 1, data.toUpperCase());
    }
  });
  return arr;
};
console.log(makeNew(data, "blabla"));

sum = (a) => (b) => (c) => (d) => console.log(a + b + c + d);
sum(5)(5)(10)(20);

output: (a = 20), (b = 55);

const test = () => {
  let a = 55;
  let b = 20;
  ////////////////
  let ran = a;
  a = b;
  b = ran;
  /////////////////
  console.log(`a is ${a}`);
  console.log(`b is ${b}`);
};
test();

let val = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let acc = 0;
val.map((e, i, arr) => {
  acc += e;
});
console.log(acc);
