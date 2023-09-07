// https://javascript.info/arraybuffer-binary-arrays

console.log('\n-------\n-------\n-------\n');

let buffer = new ArrayBuffer(16); // create a buffer of length 16

let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

console.log(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

console.log(view.length); // 4, it stores that many integers
console.log(view.byteLength); // 16, the size in bytes

// let's write a value
view[0] = 123456;

// iterate over values
for(let num of view) {
  console.log(num); // 123456, then 0, 0, 0 (4 values total)
}