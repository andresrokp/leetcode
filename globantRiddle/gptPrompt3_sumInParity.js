function globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport) {
    // Create a 4-byte buffer (32 bits)
    const buffer = new ArrayBuffer(4);

    // Create a DataView to work with the buffer
    const view = new DataView(buffer);

    // Convert dates to binary representation with padding
    const birthDateBits = (yearBirth - 1900) << 9 | (monthBirth - 1) << 5 | (dayBirth - 1);
    const passportDateBits = (yearPassport - 1900) << 9 | (monthPassport - 1) << 5 | (dayPassport - 1);

    // Calculate parity bit
    const parityBit = calculateParity(birthDateBits + passportDateBits);

    // Set data and parity bits in the DataView
    view.setUint16(0, birthDateBits);
    view.setUint16(2, passportDateBits);
    view.setUint8(0, view.getUint8(0) | parityBit);

    // Get the 32-bit encoded value
    const encodedValue = view.getUint32(0);

    return encodedValue;
}

function globantDecoder(encodedValue) {
    // Create a 4-byte buffer from the encoded value
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, encodedValue);

    // Extract data and parity bits
    const birthDateBits = view.getUint16(0);
    const passportDateBits = view.getUint16(2);
    const parityBit = view.getUint8(0) & 1;

    // Calculate expected parity bit
    const calculatedParity = calculateParity(birthDateBits + passportDateBits);

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
    let onesCount = 0;
    while (data) {
      onesCount += data & 1;
      data >>= 1;
    }
    // Parity should be 1 if onesCount is odd, 0 if even
    return onesCount % 2;
}

// Example usage:
const yearBirth = 2010;
const monthBirth = 12;
const dayBirth = 31;
const yearPassport = 2020;
const monthPassport = 12;
const dayPassport = 31;

const encoded = globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport);
console.log("Encoded:", encoded);

const [decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport, okBoolean] = globantDecoder(encoded);

console.log("Decoded Data:", decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport);
console.log("No Errors:", okBoolean);
