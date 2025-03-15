let level = 0;
let debounce = false;

function sendPrompt(prompt) {
    if (debounce) return;
    debounce = true;
    level += 0.1;
    

    debounce = false;
}

console.log('Hello world!');