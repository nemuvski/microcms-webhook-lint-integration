import { createClient } from 'microcms-js-sdk'

function client(retry = true) {
  return createClient({
    // 環境変数は事前に確認済みなので、stringでアサーションする
    serviceDomain: Bun.env.MICROCMS_SERVICE_DOMAIN as string,
    apiKey: Bun.env.MICROCMS_API_KEY as string,
    retry,
  })
}

export { client }
