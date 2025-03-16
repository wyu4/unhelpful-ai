// const { generateCompletion } = require("./ai");

const textField = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const resultBox = document.getElementById('aiText');

let submitting = false;

let level = 0.0;

function submit() {
    if (submitting) return;
    submitting = true;
    generateCompletion(level, textField.value, (response) => {
        resultBox.value  = response;
        level += 0.2;
        submitting = false;
        if (level >= 5) {
            
        }
    });
}
//
submitButton.addEventListener('click', submit);