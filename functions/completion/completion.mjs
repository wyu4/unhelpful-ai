// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default (request, context) => {
  try {
    const url = new URL(request.url)
    const subject = url.searchParams.get('name') || 'World'

    const response = fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.SCRAPYARD_KEY,
          },
          body: JSON.stringify(settings),
        });

    return new Response(JSON.stringify(response.json()))
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
}
