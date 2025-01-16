document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = '';

    fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender: 'user', message: userInput })
    })
        .then(response => response.json())
        .then(data => {
            if (data.length) {
                data.forEach(message => {
                    displayMessage(message.text, 'bot');
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
