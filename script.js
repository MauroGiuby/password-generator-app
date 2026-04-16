// Prendo gli elementi dal DOM
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const copiedText = document.getElementById("copied-text");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-text");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthText = document.getElementById("strength-text");
const strengthBars = document.querySelectorAll(".strength-bar");

const generateBtn = document.getElementById("generate-btn");

// Caratteri disponibili
const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsLower = "abcdefghijklmnopqrstuvwxyz";
const charsNumbers = "0123456789";
const charsSymbols = "!@#$%^&*()_+-=[]{};:,.<>/?";

// Aggiorno il numero accanto allo slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Funzione per generare la password
function generatePassword() {
  let chars = "";
  let password = "";

  if (uppercase.checked) chars += charsUpper;
  if (lowercase.checked) chars += charsLower;
  if (numbers.checked) chars += charsNumbers;
  if (symbols.checked) chars += charsSymbols;

  // Se nessuna opzione è selezionata
  if (chars === "") {
    passwordInput.value = "";
    strengthText.textContent = "";
    resetStrengthBars();
    return;
  }

  // Genero la password
  for (let i = 0; i < lengthSlider.value; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  passwordInput.value = password;
  updateStrength();
}

// Funzione per aggiornare la forza della password
function updateStrength() {
  const length = passwordInput.value.length;
  let score = 0;

  if (uppercase.checked) score++;
  if (lowercase.checked) score++;
  if (numbers.checked) score++;
  if (symbols.checked) score++;
  if (length >= 12) score++;

  resetStrengthBars();

  if (score <= 1) {
    strengthText.textContent = "TOO WEAK!";
    strengthBars[0].classList.add("red-bar");
  } else if (score === 2) {
    strengthText.textContent = "WEAK";
    strengthBars[0].classList.add("orange-bar");
    strengthBars[1].classList.add("orange-bar");
  } else if (score === 3) {
    strengthText.textContent = "MEDIUM";
    strengthBars[0].classList.add("yellow-bar");
    strengthBars[1].classList.add("yellow-bar");
    strengthBars[2].classList.add("yellow-bar");
  } else {
    strengthText.textContent = "STRONG";
    strengthBars.forEach(bar => bar.classList.add("green-bar"));
  }
}

// Reset delle barre
function resetStrengthBars() {
  strengthBars.forEach(bar => {
    bar.classList.remove("red-bar", "orange-bar", "yellow-bar", "green-bar");
  });
}

// Copia password
copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value);

  copiedText.classList.add("show");

  setTimeout(() => {
    copiedText.classList.remove("show");
  }, 1500);
});

// Genera password al click
generateBtn.addEventListener("click", generatePassword);
