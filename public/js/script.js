fetch('/test')
        .then(response => response.text())
        .then(data => {
            console.log(data);  // Should print "Hello World!"
        })
        .catch(error => {
            console.error('Error:', error);
        });