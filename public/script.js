document.getElementById('login-btn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Kayıt başarılı!') {
                
                localStorage.setItem('username', username);
                document.getElementById('user-name').textContent = username;
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('chat-page').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please enter your username and password.');
    }
});

document.getElementById('send-btn').addEventListener('click', function () {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (message) {
        const username = localStorage.getItem('username');

        fetch('/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.classList.add('p-3', 'mb-2', 'bg-gray-600', 'rounded');
            messageElement.textContent = `${username}: ${message}`;
            chatBox.appendChild(messageElement);
            messageInput.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

window.onload = function () {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('user-name').textContent = savedUsername;
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('chat-page').classList.remove('hidden');
    }
};
