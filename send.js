require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const telnyx = require('telnyx')(process.env.API_KEY);

const app = express();
app.use(bodyParser.json());

const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}`));

// Function for determining correct reply

async function createReply(message) {
    const caseCorrected = message.toLowerCase() // Normalizing word case
    switch (caseCorrected) {
        case "pizza":
            return ("Chicago pizza is the best")
        case "ice cream":
            return ("I prefer gelato")
        default:
            return ("Please send either the word ‘pizza’ or ‘ice cream’ for a different response")
    }
}

let id = ""

async function sendReply(text) {
    const reply = await createReply(text)
    const results = await telnyx.messages.create(
        {
            'from': '+17209534352', // Your Telnyx number
            'to': '+13039991581',
            'text': reply
        },
        function (err, response) {
            if (err) {as
                return (err)
            } else {
            // asynchronously called
            return (response)
            }
        }
    )
    return results
}

// Function for handling inbound webhooks

app.post('/webhook', (req, res) => {
    const messageId = req.body.data.payload.id
    const direction = req.body.data.payload.direction
    const attempt = req.body.meta.attempt
    if (direction === "outbound" || messageId === id) {
        console.log("exited")
        return
    } else if (direction === "inbound") {
        id = messageId
        const text = req.body.data.payload.text
        console.log(`New message: ${text}`)
        sendReply(text)
        return
    }
    return
});