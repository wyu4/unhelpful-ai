// const { generateCompletion } = require("./ai");

const textField = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const resultBox = document.getElementById('aiText');

const restartOverlay = document.getElementById('restart');

let submitting = false;

let level = 0.0;

function submit() {
    if (submitting) return;
    submitting = true;
    generateCompletion(level, textField.value, (response) => {
        resultBox.value  = response;
        submitting = false;
        if (level > 4) {
            restartOverlay.style.display = 'flex';
        }
        level += 0.2;
    });
}
//
submitButton.addEventListener('click', submit);