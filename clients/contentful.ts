import { createClient } from 'contentful'

const preview = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
}).withoutUnresolvableLinks