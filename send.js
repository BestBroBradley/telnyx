require('dotenv').config();
var telnyx = require('telnyx')(process.env.API_KEY);

// Function for determining correct reply
const createReply = (message) => {
    // Normalizing word case
    const caseCorrected = message.toLowerCase()
    switch (caseCorrected) {
        case "pizza":
            return ("Chicago pizza is the best")
        case "ice cream":
            return ("I prefer gelato")
        default:
            return ("Please send either the word ‘pizza’ or ‘ice cream’ for a different response")
    }
}

const body = createReply(message1)

// Function for sending reply
telnyx.messages.create(
    {
        'from': '+17209534352', // Your Telnyx number
        'to': '+13039991581',
        'text': body
    },
    function (err, response) {
        // asynchronously called
        console.log(response);
    }
);