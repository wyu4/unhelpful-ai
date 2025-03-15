function sendRequest(endpoint, callback) {
    var client = new XMLHttpRequest();
    client.onreadystatechange = callback(client.readyState, client.status, client.responseText);

    // Send the request
    client.open('GET', endpoint, true);
    client.send(null);
}