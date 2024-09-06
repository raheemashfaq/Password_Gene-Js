const lengthEl = document.getElementById('length');
const includeUppercaseEl = document.getElementById('include-uppercase');
const includeLowercaseEl = document.getElementById('include-lowercase');
const includeNumbersEl = document.getElementById('include-numbers');
const includeSymbolsEl = document.getElementById('include-symbols');
const passwordEl = document.getElementById('password');
const generateBtn = document.getElementById('generate-btn');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = includeUppercaseEl.checked;
    const hasLower = includeLowercaseEl.checked;
    const hasNumber = includeNumbersEl.checked;
    const hasSymbol = includeSymbolsEl.checked;

    passwordEl.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
