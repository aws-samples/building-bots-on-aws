# Module 4: Monitoring the bot with AWS Chatbot

#### Background

AWS Chatbot enables your team to receive AWS notifications in Slack. To enable notifications, you need to configure the Chatbot with a Slack channel and choose SNS topics that will notify the channel. Then you configure other AWS services to publish notifications to SNS topics and AWS Chatbot will format and deliver notifications to Slack. See [Chatbot documentation](https://docs.aws.amazon.com/chatbot/latest/adminguide/related-services.html#related-services.title) for the list of AWS services integrated with AWS Chatbot.

Your application already includes a CloudWatch Alarm preconfigured to send a notification to an SNS topic when a Lambda function invocation fails.

![Chatbot diagram](images/chatbot-diagram.png)

#### High-level instructions

Configure AWS Chatbot with your Slack workspace. Use the SNS topic that was created by the application.

#### Step-by-step directions

1. Go to AWS Console, choose **Services** in the navigation, and choose **AWS Chatbot** in the list of services.
1. In **Configure a chat client**, choose **Slack**, and choose **Configure client**.

    ![Chatbot home](images/chatbot-home.png)

1. In the next screen, choose **Allow**.

    ![Chatbot Slack OAuth](images/chatbot-slack-oauth.png)

1. In the **Configure Slack channel** screen, choose the Slack channel where you want to receive notifications. We recommend creating a new public channel for monitoring the Slack app.
1. Under **IAM permissions**, leave the default settings and give a name to the role.

    ![Chatbot role](images/chatbot-configure-channel-role.png)

1. Under **SNS topics**, select the region where you created the application (**US East - Ohio**) and choose the SNS topic named **APP_NAME-OpsNotificationsTopic-RANDOM_STRING**. Choose **Configure**.

    ![Chatbot topics](images/chatbot-configure-channel-topics.png)

---

### 8. Test AWS Chatbot notifications

#### Background

To test the AWS Chatbot notifications, you will cause the Lambda function to fail and trigger a CloudWatch Alarm.

#### High-level instructions

In the Lambda console, create a test event that will guarantee the function to fail. Wait until you receive a CloudWatch Alarm in Slack from AWS Chatbot.

#### Step-by-step directions

1. Choose **Services** in the navigation and and choose **Lambda**.
1. Choose **Applications** in the left menu and click on your application name in the list.
1. Under the **Resources** section, choose **SlackLambdaFunction**.
1. Choose **Test** in the top right corner.
1. In the pop-up form, give event an **Event name**, paste the following snippet into the code editor, and choose **Create**.

    ```
    {
        "body": "non-JSON"
    }
    ```

    ![Test event fail](images/lambda-test-event-fail.png)

1. Choose **Test** button again.
1. The Lambda function will fail and display a failure message.

    ![Failed Lambda](images/lambda-failed.png)

1. Within a couple of minutes, you will receive a CloudWatch Alarm notification in the Slack channel where you configured AWS Chatbot.

    ![CloudWatch Alarm](images/slack-cloudwatch-alarm.png)

### :star: Recap

:wrench: In this module you've configured AWS to send CloudWatch Alarms to your Slack bot.

:star: Congratulations, you have completed the Building Serverless Bots on AWS Workshop!

### Next

:white_check_mark: See this workshop's [cleanup guide][cleanup] for instructions on how to delete the resources you've created.

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

[setup]: ../00_Setup/
[cleanup]: ../01_CleanUp/
[serverless-app-setup]: ../1_ServerlessAppSetup/
[code-management]: ../2_CodeManagement/
[setup-chatbot]: ../3_ChatBot/
[notifications]: ../4_AWSNotifications/
