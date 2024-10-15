const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Kullanıcı adı ve şifre gerekli!');
    }

    fs.readFile('logs/user.json', 'utf8', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        if (users.includes(username)) {
            return res.status(400).send('Bu kullanıcı adı zaten var.');
        }
        users.push(username);
        fs.writeFile('logs/user.json', JSON.stringify(users), (err) => {
            if (err) throw err;
        });
    });

    fs.readFile('logs/pass.json', 'utf8', (err, data) => {
        if (err) throw err;
        let passwords = JSON.parse(data);
        passwords[username] = password;
        fs.writeFile('logs/pass.json', JSON.stringify(passwords), (err) => {
            if (err) throw err;
            res.send('Kayıt başarılı!');
        });
    });
});

app.post('/message', (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).send('Kullanıcı adı ve mesaj gerekli!');
    }
  
    fs.readFile('logs/messages.json', 'utf8', (err, data) => {
        if (err) throw err;
        let messages = JSON.parse(data);
        messages.push({ username, message, timestamp: new Date() });
        fs.writeFile('logs/messages.json', JSON.stringify(messages), (err) => {
            if (err) throw err;
            res.send('Mesaj kaydedildi!');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
