/* 
    Licensed under MIT-0
    This function processes events from Slack (received through API Gateway) and echoes them back to Slack.
*/
const AWS = require('aws-sdk')
const secretsManager = new AWS.SecretsManager()

// The main handler
exports.handler = async (event) => {
    console.log(JSON.stringify(event))

    if (event == undefined || !event.hasOwnProperty('body')) {
        console.error('Malformed event')
        return { statusCode: 400 }
    }

    const eventBody = JSON.parse(event.body)

    // Challenge verification. If 'challenge' is present in the request, return the challenge value
    if (eventBody.hasOwnProperty('challenge')) {
        console.log('Challenge present')
        return { statusCode: 200, body: eventBody.challenge }
    }

    // In direct message conversations with bots, Slack sends bot's messages back to the events
    // endpoint. If the subtype of the event is 'bot_message', the function will ignore it.
    if (eventBody.event.subtype == 'bot_message')
        return { statusCode: 200 }
    
    console.log(`user ${eventBody.event.user} sent in channel ${eventBody.event.channel}, message ${eventBody.event.text}, of type ${eventBody.event.type} and subtype ${eventBody.event.subtype}`)

    // Getting the bot token from a Secrets Manager's secret
    const secretData = await secretsManager.getSecretValue({SecretId: process.env.SECRET}).promise();
    const secretString = JSON.parse(secretData.SecretString);

    return await postToSlack(secretString.Bot_Token, eventBody.event.channel, eventBody.event.text)
}

const postToSlack = async (token, channel, text) => {
  return new Promise((resolve, reject) => {
    const https = require('https')
    const data = {
        token,
        channel,
        text
    }
    
    const options = {
        hostname: 'slack.com',
        port: 443,
        path: '/api/chat.postMessage',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    }

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    
        resolve({statusCode: 200})
    })
    
    // If error
    req.on('error', (e) => {
        console.error('Error: ', e)
        reject({statusCode: 400})
    })

    // Send the request
    req.write(JSON.stringify(data))
    req.end()
  })
}