# Module 3: Create a Slack app

You will create an application in Slack and make it work with your Serverless Application on AWS. Amazon API Gateway is a managed API service that you will use to subscribe to events from Slack. AWS Secrets Manager is a service to securely store secrets. The app will use two secrets from Slack: 1) the signing secret that enables the app to verify authenticity of events received from Slack and 2) the Bot Token that enables the app to post messages to Slack.

## Implementation Instructions

:heavy_exclamation_mark: Ensure you've completed the [Code Management][code-management] before beginning
the workshop.

Each of the following sections provides an implementation overview and detailed, step-by-step instructions. The overview should provide enough context for you to complete the implementation if you're already familiar with the AWS Management Console or you want to explore the services yourself without following a walkthrough.

### 1. Create your Slack application

Create a Slack application and set up the necessary permissions and bot user. Copy the signing secret to AWS Secrets Manager. Install the app to your workspace and copy the bot token to AWS Secrets Manager. Copy the API Gateway endpoint from Lambda and use it to subscribe to Slack events - once you paste it, it should be automatically verified. Choose the events you want to subscribe to and re-install the Slack app to your Slack workspace.

**:white_check_mark: Step-by-step directions**

1. Go to [api.slack.com][api-slack] and choose **Your apps** in the top right corner.
1. Choose **Create New App**.
1. Give your app a name and choose the development workspace that will own the app. Choose **Create App**.
    
    ![Create app modal](../images/slack-create-app-dialog.png)

1. In the **Basic Information** screen, choose **Permissions**.
1. Scroll down to **Scopes**
    1. Select **Add an OAuth Scope**
    1. Choose the **chat:write:bot** scope
    1. Choose **Save Changes** (if presented)
    
    ![Scopes](../images/slack-scopes.png)

1. In the left menu, choose **Bot Users** and choose **Add a Bot User** in the screen that opens.
1. Give your bot a **Display name**, a **Default username**, and choose **Always Show My Bot as Online**. Choose **Add Bot User**.
1. In the left menu, choose **Basic Information** and scroll to the **App Credential** section.
1. In the **Singing Secret** textbox, choose **Show** and copy the secret value.

   ![Signing secret image](../images/slack-signing-secret.png)

1. Go to the [AWS Secrets Manager console][secrets-manager-console].
1. Find the secret named as **APP_NAME-Secret** and choose it.

    ![Secrets manager](../images/secrets-manager-console.png)

1. Scroll down to the **Secret value** section and choose **Retrieve secret value**.
1. Choose **Edit**.
1. Paste the **Signing secret** you copied in Slack to the textbox next to **Signing_Secret** key. Don't save it yet and keep the tab open.

    ![Edit secret](../images/secrets-manager-edit-secret-value.png)

1. Go back to the Slack app configuration page.
1. In the left menu, choose **Install App** and choose **Install App to Workspace**.
1. Choose **Allow** in the following screen.
    
    ![OAuth](../images/slack-oauth.png)

1. Copy the **Bot User OAuth Access Token**.

    ![Bot access token](../images/slack-bot-token.png)

1. Go back to the [AWS Secrets Manager console][secrets-manager-console] and find your secret again.
1. Paste the token you just copied to the textbox next to **Bot_Token** key. Choose **Save**.
1. Go back to the [Lambda applications console][lambda-apps] and find the application you created in module 1.
1. Scroll down until you see the **API Endpoint** section and copy the **API endpoint** URL.
1. Go back to the Slack app configuration page.
1. In the left menu, choose **Event Subscriptions** and turn **Enable Events** on.
1. Paste the API Gateway endpoint you copied in the Lambda console in step 4 to the **Request URL** textbox and add "/slackevents" to the end of it and press Enter. You should see a **Verified** label.

    ![Endpoint verified](../images/slack-verified.png)

1. In **Subscribe to Bot Events** section, choose **Add Bot User Event** and select **app_mention** and **message.im**.

    ![Bot events](../images/slack-bot-events.png)

1. Choose **Save Changes**.    
1. A warning message will appear at the top, requesting the app to be re-installed. Choose **reinstall your app**.

    ![Reinstall app](../images/slack-reinstall.png)

1. Choose **Allow** in the app installation screen that opens.

---

### 2. Test!

1. Go to the Slack app and find the bot user you've just added. Send it a message. The bot should echo the message back.

    ![Test IM](../images/slack-test.png)

1. Add the bot to a channel and send it an @-message. The bot should respond.

    ![Test Channel](../images/slack-test-channel.png)

### :star: Recap

:wrench: You just created a Slack app to connect to your AWS account. From here you can now add business logic and easily build more sophisticated bots.

### Next

:white_check_mark: Proceed to the next module, [AWS Notifications][notifications], wherein you'll configure AWS to send events to your Slack bot.

---
[cognito]: https://aws.amazon.com/cognito/
[lambda]: https://aws.amazon.com/lambda/
[api-gw]: https://aws.amazon.com/api-gateway/
[s3]: https://aws.amazon.com/s3/
[dynamodb]: https://aws.amazon.com/dynamodb/
[secrets-manager]: https://aws.amazon.com/secrets-manager/
[sns]: https://aws.amazon.com/sns/
[cloudwatch]: https://aws.amazon.com/cloudwatch/
[chatbot]: https://aws.amazon.com/chatbot/
[aws-sam]: https://aws.amazon.com/serverless/sam/
[codepipeline]: https://aws.amazon.com/codepipeline/
[codecommit]: https://aws.amazon.com/codecommit/
[codebuild]: https://aws.amazon.com/codebuild/
[cloudformation]: https://aws.amazon.com/cloudformation/
[aws-console]: https://console.aws.amazon.com
[iam-console]: https://console.aws.amazon.com/iam/home
[lambda-console]: https://console.aws.amazon.com/lambda/home
[cfn-console]: https://console.aws.amazon.com/cloudformation/home
[s3-console]: https://console.aws.amazon.com/s3/home
[chatbot-console]: https://console.aws.amazon.com/chatbot/home
[api-slack]: https://api.slack.com
[secrets-manager-console]: https://console.aws.amazon.com/secretsmanager/home
[lambda-apps]: https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/applications

[setup]: ../00_Setup/
[cleanup]: ../01_Cleanup/
[serverless-app-setup]: ../1_ServerlessAppSetup/
[code-management]: ../2_CodeManagement/
[setup-chatbot]: ../3_ChatBot/
[notifications]: ../4_AWSNotifications/
