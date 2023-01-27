// Assignment Code

// Create var Arrays for all character types
var upperCasedCharacters = [
  'A','B','C','D','E','F','G','H','I',
  'J','K','L','M','N','O','P','Q','R',
  'S','T','U','V','W','X','Y','Z'
];

var lowerCasedCharacters = [
  'a','b','c','d','e','f','g','h','i',
  'j','k','l','m','n','o','p','q','r',
  's','t','u','v','w','x','y','z'
];

var specialCharacters = [
  '@','%','+','\\','/',"'",'!',
  '#','$','^','?',':',',',')','(',
  '}','{',']','[','~','-','_','.'
];

var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Prompts a dialogue box to input password options
function getPasswordOptions() {
  var length = parseInt(
    prompt('Specify a password length between 8 and 128')
  );

// Failsafes for an incorrect value input from user
  if (isNaN(length) === true) {
    alert('Please select a password length between 8 and 128.');
    return;
  }

  if (length < 8) {
    alert('Please select a password length between 8 and 128.');
    return;
  }

  if (length > 128) {
    alert('Please select a password length between 8 and 128.');
    return;
  }

  // Opens dialogue boxes which prompts the user to either include or exclude various options regarding password generation
  var hasSpecialCharacters = confirm(
    'Click OK to include special characters, cancel to exclude.'
  );

  var hasNumericCharacters = confirm(
    'Click OK to include numeric characters, cancel to exclude.'
  );

  var hasLowerCasedCharacters = confirm(
    'Click OK to include lowercase characters, cancel to exclude.'
  );

  var hasUpperCasedCharacters = confirm(
    'Click OK to includ uppercase characters, cancel to exclude.'
  );

  // Failsafe for a user denying all options
  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowerCasedCharacters === false &&
    hasUpperCasedCharacters === false
  ) {
    alert('Must select at least one character type to continue');
    return;
  }

  // Object where password Options are stored
  var passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowerCasedCharacters: hasLowerCasedCharacters,
    hasUpperCasedCharacters: hasUpperCasedCharacters
  };

  return passwordOptions;
}

// Get random element
function getRandom(arr) {
  var randIndex = Math.floor(Math.random() * arr.length);
  var randElement = arr[randIndex];

  return randElement;
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  var result = [];

  // Array to store types of characters to include in password
  var possibleCharacters = [];

  // Array to contain one of each type of chosen character to ensure each will be used
  var guaranteedCharacters = [];

  // Conditional statements to add user options into possible characters
  if (options.hasSpecialCharacters) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.hasNumericCharacters) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasLowerCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpperCasedCharacters) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  // For loop to iterate over the password length from the options object, selecting random possible characters, and linking those characters to the result
  for (var i = 0; i < options.length; i++) {
    var possibleCharacter = getRandom(possibleCharacters);

    result.push(possibleCharacter);
  }

  // Ensures user selections are returned as expected
  for (var i = 0; i < guaranteedCharacters.length; i++) {
    result[i] = guaranteedCharacters[i];
  }

  // Transform the result into a string
  return result.join('');
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
