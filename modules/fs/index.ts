import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

class ReviewsDirectory {
  protected static readonly REVIEW_DIRNAME = 'reviews'

  protected readonly path: string

  constructor(api: string, contentId: string, updatedAt: Date) {
    this.path = join(ReviewsDirectory.REVIEW_DIRNAME, api, contentId, updatedAt.getTime().toString())
  }

  /**
   * ディレクトリを作成する
   *
   * 存在する場合は、何もしない
   */
  protected async create() {
    if (existsSync(this.path)) {
      return
    }
    await mkdir(this.path, { recursive: true })
  }

  /**
   * ファイルを作成する
   *
   * @param filename 拡張子は含まない（含んでも上書きする）
   * @param content 書き出す内容
   */
  async putFile(filename: string, content: string) {
    await this.create()
    // NOTE: フィールドの内容を元に拡張子を変えても良いが、今回は全て .html とする
    const filePath = join(this.path, `${filename}.html`)
    await Bun.write(filePath, content)
  }
}

export { ReviewsDirectory }
