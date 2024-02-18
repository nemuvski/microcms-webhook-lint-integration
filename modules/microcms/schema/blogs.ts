import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'
import type { CategoriesSchemaContent } from './categories'

/**
 * blogsのスキーマ
 *
 * NOTE: スキーマを変更した場合は、この型定義を変更する
 */
interface BlogsSchemaContent extends MicroCMSListContent {
  title?: string
  content?: string
  eyecatch?: MicroCMSImage
  category: CategoriesSchemaContent | null
}

function specifyFields<T extends keyof BlogsSchemaContent>(...field: Array<T>): Array<T> {
  return field
}

/**
 * リントチェックするために、fieldsを指定したもの
 *
 * NOTE: フィールドを変更する場合は、この関数の引数部分を変更する
 */
const targetBlogsSchemaContentFields = specifyFields('title', 'content')

export { type BlogsSchemaContent, targetBlogsSchemaContentFields }
