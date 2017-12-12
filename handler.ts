import { APIGatewayEvent, Callback, Context } from "aws-lambda"

export function fetchTweets(event: APIGatewayEvent, context: Context, callback: Callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This is a lambda function updated via circleci',
      input: event,
    })
  }

  callback(null, response);
}
