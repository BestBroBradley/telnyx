require('dotenv').config();
var telnyx = require('telnyx')(process.env.API_KEY);

telnyx.messages.create(
  {
    'from': '+17209534352', // Your Telnyx number
    'to': '+13039991581',
    'text': 'Hello, World!'
  },
  function(err, response) {
    // asynchronously called
    console.log(response);
  }
);