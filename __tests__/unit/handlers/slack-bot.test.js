// Import all functions from slack-bot.js
const lambda = require('../../../src/handlers/slack-bot.js');

describe('Test for slack-bot', () => {
    // This test invokes the hello-from-lambda Lambda function and compares the result
    it('Verifies successful response', async () => {
        // Invoke handler()
        const result = await lambda.handler();

        /*
            The expected result should match the return from your Lambda function.
            We expect the Lambda to return {statusCode: 400} when there's no event provided.
        */
        const expectedResult = { statusCode: 200 };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
