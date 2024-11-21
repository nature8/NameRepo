const { validateFile } = require("../helpers/fileHandler");

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

exports.handlePostRequest = async (req, res) => {
  const { data = [], file_b64 } = req.body;

  const user_id = "john_doe_17091999";
  const email = "john@xyz.com";
  const roll_number = "ABCD123";

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let primeFound = false;

  for (const item of data) {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) primeFound = true;
    } else if (typeof item === "string") {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z' && (!highestLowercase || item > highestLowercase)) {
        highestLowercase = item;
      }
    }
  }

  const fileDetails = file_b64 ? await validateFile(file_b64) : { file_valid: false };

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: primeFound,
    ...fileDetails,
  });
};

exports.handleGetRequest = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};
