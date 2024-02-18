import { ReviewsDirectory } from '@modules/fs'
import { fetchBlogsContent, targetBlogsSchemaContentFields } from '@modules/microcms'
import { uniformize } from '@modules/uniform'

if (!Bun.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('環境変数 MICROCMS_SERVICE_DOMAIN が未定義か空文字です。')
}
if (!Bun.env.MICROCMS_API_KEY) {
  throw new Error('環境変数 MICROCMS_API_KEY が未定義か空文字です。')
}

const argv = Bun.argv
if (argv.length !== 5) {
  console.info('Usage: deno run main.ts <api> <content-id> <draft-key>')
  throw new Error('引数が不正です。')
}
const api = argv[2]
const contentId = argv[3]
const draftKey = argv[4]

const data = await fetchBlogsContent(api, contentId, draftKey)

const reviewsDir = new ReviewsDirectory(api, contentId, new Date(data.updatedAt))

// 対象のフィールドの内容をファイルに書き出す
// 内容が空の場合は、何もしない
for (const field of targetBlogsSchemaContentFields) {
  const fieldContent = data[field]

  if (!fieldContent) {
    console.info(`リント対象のフィールド ${field} が空でした。`)
    continue
  }

  // リントの結果（問題箇所の指摘など）を見易くするために、事前にテキストの正規化を行う
  const uniformed = uniformize(fieldContent)

  await reviewsDir.putFile(field, uniformed)
}
