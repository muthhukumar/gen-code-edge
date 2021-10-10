import {EntryContext, json} from 'remix'

import ReactDOMServer from 'react-dom/server'
import {RemixServer} from 'remix'

const convertToBase64 = value => {
  return btoa(value)
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const url = new URL(request.url)

  if (url.pathname === '/api') {
    let stringLength = Number(url.searchParams.get('length')) ?? 32

    if (Object.is(stringLength, NaN)) {
      stringLength = 32
    }

    if (stringLength <= 0 || stringLength > 10000) {
      stringLength = 10000
    }

    const randomNumbers = Array.from({length: stringLength})
      .map(() => randomIntFromInterval(0, 9))
      .join('')

    return json({data: convertToBase64(String(randomNumbers)).slice(0, stringLength)})
  }

  let markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
