import { client } from './client'
import { type BlogsSchemaContent, targetBlogsSchemaContentFields } from './schema/blogs'

async function fetchBlogsContent(api: string, contentId: string, draftKey: string) {
  const fields = ['updatedAt', ...targetBlogsSchemaContentFields] as const

  const result = await client().get<Pick<BlogsSchemaContent, (typeof fields)[number]>>({
    endpoint: api,
    contentId,
    queries: {
      draftKey,
      fields: fields.join(','),
    },
  })

  return result
}

export { fetchBlogsContent, targetBlogsSchemaContentFields }
