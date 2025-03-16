// const { generateCompletion } = require("./ai");

const textField = document.getElementById('textInput');
const submitButton = document.getElementById('hiddenSubmitButton');
const resultBox = document.getElementById('aiText');

let submitting = false;

let level = 1.0;

function submit() {
    if (submitting) return;
    submitting = true;
    generateCompletion(level, textField.innerText, (response) => {resultBox.value  = response; level += 0.2; submitting = false;});
}

submitButton.addEventListener('click', submit);