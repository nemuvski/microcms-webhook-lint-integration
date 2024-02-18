import type { MicroCMSListContent } from 'microcms-js-sdk'

/**
 * categoriesのスキーマ
 *
 * NOTE: スキーマを変更した場合は、この型定義を変更する
 */
interface CategoriesSchemaContent extends MicroCMSListContent {
  name?: string
}

export type { CategoriesSchemaContent }
