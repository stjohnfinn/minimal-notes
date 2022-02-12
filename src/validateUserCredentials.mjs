import * as EmailValidator from 'email-validator';

/**
 * 
 * @param {string} email the user's email
 * @param {string} password the user's password
 * @returns true if both email and password pass all validation tests, false if not
 */
export default function validateUserCredentials(email, password) {
    return validateEmail(email) && validatePassword(password);
}


//  uses javascript validator node module to validate an email address
function validateEmail(email) {
    return EmailValidator.validate(email);
}

// requirements for password:
// at least 8 characters and at most 16
// at least one number and one letter
// 5 or more unique characters
// at least one [ ~!@#$$%^&*-+=+[]{};:,.? ]

/**
 * 
 * @param {string} password 
 * @returns true if the password is valid, false if not
 */
function validatePassword(password) {
    
    const length = password.length;

    if (length > 16 || length < 8) {
        return false;
    }

    if (uniqueCount(password) < 5) { 
        return false;
    }

    if (!hasNumberAndLetter(password)) {
        return false;
    }

    if (!hasSpecialChar(password)) {
        return false;
    }

    return true;
}

const SPECIAL_CHARS = ["~","!","@","#","$","%","^","&","*","-","+","=","+","[","]","{","}",";",":",",",".","?"];

/**
 * @param {string} str
 * @returns true if the string contains a special character, false if not
 */
function hasSpecialChar(str) {
    let has = false;
    for (const c of str) {
        if (SPECIAL_CHARS.includes(c)) {
            has = true;
        }
        if (has) {
            return true;
        }
    }
    return false;
}

/**
 * 
 * @param {string} str 
 * @returns the number of unique characters in str
 */
function uniqueCount(str) {
    let chars = [];
    for (const c of str) {
        if (!chars.includes(c)) {
            chars.push(c);
        }
    }
    return chars.length;
}

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

/**
 * 
 * @param {string} str 
 * @returns true if str includes both a number and a letter
 */
function hasNumberAndLetter(str) {
    let hasNum = false;
    let hasLetter = false;
    for (let c of str.toLowerCase()) {
        if (NUMBERS.includes(c)) {
            hasNum = true;
        }
        if (LETTERS.includes(c)) {
            hasLetter = true;
        }
        if (hasNum && hasLetter) {
            return true;
        }
    }
    return false;
}