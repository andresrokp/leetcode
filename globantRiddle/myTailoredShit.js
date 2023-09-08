function globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport) {
    // Create a 4-byte buffer (32 bits)
    const buffer = new ArrayBuffer(4);

    // Create a DataView to work with the buffer
    const view = new DataView(buffer);

    // Convert dates to binary representation with padding
    const birthDateBits = (yearBirth - 1900) << 9 | (monthBirth - 1) << 5 | (dayBirth - 1);
    const passportDateBits = (yearPassport - 1900) << 9 | (monthPassport - 1) << 5 | (dayPassport - 1);

    console.log('birthDateBitsENC\t',birthDateBits);
    console.log('birthDateBitsENC\t',birthDateBits.toString(2));
    console.log('passportDateBitsENC\t',passportDateBits);
    console.log('passportDateBitsENC\t',passportDateBits.toString(2));
    
    // Set data and parity bits in the DataView
    view.setUint16(0, birthDateBits);
    view.setUint16(2, passportDateBits);
    
    // Calculate parity bit
    const parityBit = calculateParity(view.getUint32(0)); //@2012 118524  11100111011111100  12_1s pb=0
    console.log('parityBitENC\t\t',parityBit);
    
    console.log('encBeforePar\t\t',view.getUint32(0));
    console.log('encBeforePar\t\t',view.getUint32(0).toString(2));
    
    console.log('firstOctet\t\t',view.getUint8(0));
    console.log('firstOctet\t\t',view.getUint8(0).toString(2));
    view.setUint8(0, view.getUint8(0) | parityBit); 
    // Get the 32-bit encoded value
    const encodedValue = view.getUint32(0); //@2012 igual
    console.log("finalENC:\t\t", encodedValue);
    console.log("finalENC:\t\t", encodedValue.toString(2));
    console.log("- - - -:");

    return encodedValue;
}

function globantDecoder(encodedValue) {
    // Create a 4-byte buffer from the encoded value
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, encodedValue);
    console.log('decoderInput\t\t',view.getUint32(0));
    console.log('decoderInput\t\t',view.getUint32(0).toString(2));
    view.setUint8(0, view.getUint8(0) & 0b11111111); 
    view.setUint8(2, view.getUint8(2) & 0b11111111); 
    console.log('decoderInputHarmed\t',view.getUint32(0));
    console.log('decoderInputHarmed\t',view.getUint32(0).toString(2));

    // Extract data and parity bits
    const birthDateBits = view.getUint16(0);
    const passportDateBits = view.getUint16(2);
    const parityBit = view.getUint8(0) & 1;
    
    console.log('birthDateBitsDEC\t',birthDateBits);
    console.log('birthDateBitsDEC\t',birthDateBits.toString(2));
    console.log('passportDateBitsDEC\t',passportDateBits);
    console.log('firstOctetDEC\t\t',view.getUint8(0).toString(2));
    console.log('parityBit_READ_DEC\t',parityBit);
    
    // Calculate expected parity bit
    const calculatedParity = calculateParity(view.getUint32(0));
    console.log('calculatedParityDEC\t',calculatedParity);

    // Check for errors
    const okBoolean = parityBit === calculatedParity;

    // Extract birth and passport date information
    const yearBirth = ((birthDateBits >> 9) & 0x7F) + 1900;
    const monthBirth = ((birthDateBits >> 5) & 0xF) + 1;
    const dayBirth = (birthDateBits & 0x1F) + 1;
    const yearPassport = ((passportDateBits >> 9) & 0x7F) + 1900;
    const monthPassport = ((passportDateBits >> 5) & 0xF) + 1;
    const dayPassport = (passportDateBits & 0x1F) + 1;

    return [yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport, okBoolean];
}

function calculateParity(data) {
  // Initialize parity to 0
  let parity = 0;

  // Perform a bitwise XOR of each bit in the number
  for (let i = 0; i < 32; i++) {
    parity ^= ((data >>> i) & 1);
  }

  return parity;
}

// Example usage:
const yearBirth = 2012;
const monthBirth = 12;
const dayBirth = 31;
const yearPassport = 2020;
const monthPassport = 12;
const dayPassport = 31;

const encoded = globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport);

const [decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport, okBoolean] = globantDecoder(encoded);

console.log("Decoded Data:", decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport);
console.log("No Errors:", okBoolean);
console.log("FIN");
