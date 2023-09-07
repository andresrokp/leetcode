// https://www.geeksforgeeks.org/count-total-bits-number/

console.log('\n-------\n-------\n-------\n');

function countBits(number) {       
    // log function in base 2  
    // take only integer part 
    return Math.floor(Math.log2(number)+1); 
  } 
  
  // Driven program        

  let num = 6058533266; 
  console.log(countBits(num));