import { createClient, type Asset, type AssetQueries, type EntriesQueries, type EntryCollection, type EntrySkeletonType } from 'contentful'
import { waitUntil } from '@vercel/functions'
import { redis } from './redis'

const preview = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.PREVIEW === 'true'

const content = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
}).withoutUnresolvableLinks

export const contentful = content

const cached = async <T>(key: string, fetch: () => Promise<T>): Promise<T> => {
  const hit = await redis.get(key)
  if (hit) {
    console.log('cache hit', key)
    return JSON.parse(hit as string)
  }
  console.log('cache miss', key)
  const value = await fetch()
  waitUntil(redis.set(key, JSON.stringify(value)))
  return value
}

export const cachedEntries = async <T extends EntrySkeletonType>(q: EntriesQueries<T, 'WITHOUT_UNRESOLVABLE_LINKS'>): Promise<EntryCollection<T, 'WITHOUT_UNRESOLVABLE_LINKS', string>> => {
  return cached(JSON.stringify(q), () => content.getEntries(q))
}

export const cachedTags = (): Promise<Awaited<ReturnType<typeof content.getTags>>> => {
  return cached('getTags', () => content.getTags())
}

export const cachedAsset = (id: string, query?: AssetQueries<'WITHOUT_UNRESOLVABLE_LINKS'>): Promise<Asset> => {
  return cached(`getAsset:${id}:${JSON.stringify(query ?? {})}`, () => content.getAsset(id, query))
}
