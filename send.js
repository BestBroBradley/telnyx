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

let prevIds = [] // Failsafe to ensure duplicate messages aren't ingested, not inherently scalable

// Function for formatting the reply for Telnyx
async function sendReply(text, sender) {
    const reply = await createReply(text)
    const results = await telnyx.messages.create(
        {
            'from': '+17209534352', // Your Telnyx number
            'to': sender, // Desired recipient
            'text': reply
        },
        function (err, response) {
            if (err) {as
                return (err)
            } else {
            return (response)
            }
        }
    )
    return results
}

// Function for handling inbound webhooks
app.post('/webhook', (req, res) => {
    const {from, id, direction, text} = req.body.data.payload
    const sender = from.phone_number
    const messageId = id
    // If not a new inbound message, disregard
    if (direction === "outbound" || prevIds.includes(messageId)) {
        console.log("exited")
        return
    // If new inbound message, continue onward
    } else if (direction === "inbound") {
        prevIds.push(messageId)
        console.log(`New message: ${text}`)
        sendReply(text, sender)
        return
    }
    return
});