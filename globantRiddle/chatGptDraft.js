/**
 * The Marketing Department of the duty-free shop of an airport wants to obtain statistics about its clients.

For this purpose, there is a small device at the entrance that scans the passport and obtains the date of issue of the passport and the owner’s date of birth.

Each date consists of the day, month, and year, and the range of years that the system manages goes from 1900 to 2023.

This information is sent through a channel with a very small bandwidth (32 bits per packet). In turn, there is a very small probability of error in the transfer (much less than 1/32) that should be detected when receiving a package if there was an error in the delivery through a parity check (its redundancy must be included in the packet).

Implement the encoder called GlobantCoder (PassportDate, BirthDate) -> Package_32_bits and its correspondent decoder GlobantDecoder Package_32_bits -> (PassportDate, BirthDate, BooleanWithoutErrors)

Implement it using Python or JavaScript. The usage of the code is as follows.

JavaScript:

// Encoding dates:
encoded = globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport)

// Decoding and validating:
[yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport, okBoolean] = globantDecoder(encoded)
 */



// Encoding function
function globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport) {
    // Convert dates to binary representation with padding
    const birthDateBits = padBinary(yearBirth - 1900, 7) + padBinary(monthBirth - 1, 4) + padBinary(dayBirth - 1, 5);
    const passportDateBits = padBinary(yearPassport - 1900, 7) + padBinary(monthPassport - 1, 4) + padBinary(dayPassport - 1, 5);
  
    // Calculate parity bit
    const parityBit = calculateParity(birthDateBits + passportDateBits);
  
    // Concatenate data and parity bit
    const encodedData = birthDateBits + passportDateBits + parityBit;
  
    // Convert binary string to a 32-bit integer
    const encodedValue = parseInt(encodedData, 2);
  
    return encodedValue;
  }
  
  // Decoding and validation function
  function globantDecoder(encodedValue) {
    // Convert the encoded integer to binary string
    const encodedData = encodedValue.toString(2).padStart(32, '0');
  
    // Separate data and parity bit
    const dataBits = encodedData.slice(0, 29);
    const receivedParityBit = encodedData.slice(29);
  
    // Calculate expected parity bit
    const calculatedParity = calculateParity(dataBits);
  
    // Check for errors
    const okBoolean = receivedParityBit === calculatedParity;
  
    // Extract birth and passport date information
    const yearBirth = parseInt(dataBits.slice(0, 7), 2) + 1900;
    const monthBirth = parseInt(dataBits.slice(7, 11), 2) + 1;
    const dayBirth = parseInt(dataBits.slice(11, 16), 2) + 1;
    const yearPassport = parseInt(dataBits.slice(16, 23), 2) + 1900;
    const monthPassport = parseInt(dataBits.slice(23, 27), 2) + 1;
    const dayPassport = parseInt(dataBits.slice(27, 32), 2) + 1;
  
    return [yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport, okBoolean];
  }
  
  // Helper function to calculate parity
  function calculateParity(data) {
    let parity = 0;
    for (let i = 0; i < data.length; i++) {
      parity ^= parseInt(data[i]);
    }
    return parity.toString();
  }
  
  // Helper function to pad binary representation
  function padBinary(value, length) {
    return value.toString(2).padStart(length, '0');
  }
  
  // Example usage:
  const yearBirth = 1990;
  const monthBirth = 5;
  const dayBirth = 15;
  const yearPassport = 2020;
  const monthPassport = 7;
  const dayPassport = 10;
  
  const encoded = globantEncoder(yearBirth, monthBirth, dayBirth, yearPassport, monthPassport, dayPassport);
  console.log("Encoded Data Type:", typeof (encoded));
  console.log("Encoded Data:", encoded);
  console.log("Encoded Data:", encoded);
  
  const [decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport, okBoolean] = globantDecoder(encoded);
  
  console.log("Decoded Data:", decodedYearBirth, decodedMonthBirth, decodedDayBirth, decodedYearPassport, decodedMonthPassport, decodedDayPassport);
  console.log("No Errors:", okBoolean);
  