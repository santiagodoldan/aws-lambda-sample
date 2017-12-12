export function fetchTweets(event, context, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This is a lambda function updated via circleci',
      input: event,
    })
  }

  callback(null, response);
}
