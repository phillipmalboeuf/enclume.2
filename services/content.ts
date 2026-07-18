import type { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { cachedEntries } from '@/clients/contentful'
import { GetStaticPropsContext } from 'next'
import { TypeAboutPageSkeleton, TypeAwardSkeleton, TypeAwardsPageSkeleton, TypeCategorySkeleton, TypeCollaboratorSkeleton, TypeContactSkeleton, TypeEngagementsPageSkeleton, TypeHomepageSkeleton, TypeProjectSkeleton, TypeTeamMemberSkeleton } from './types'


const envLocale = process.env.LOCALE
const limit = 42

export const ContentService = {
  homepage: async (locale: string=envLocale) =>
    (await cachedEntries<TypeHomepageSkeleton>({ content_type: 'homepage', locale })).items[0],
  contact: async (locale: string=envLocale) =>
    (await cachedEntries<TypeContactSkeleton>({ content_type: 'contact', locale })).items[0],
  aboutPage: async (locale: string=envLocale) =>
    (await cachedEntries<TypeAboutPageSkeleton>({ content_type: 'aboutPage', locale })).items[0],
  engagementsPage: async (locale: string=envLocale) =>
    (await cachedEntries<TypeEngagementsPageSkeleton>({ content_type: 'engagementsPage', locale })).items[0],
  categories: async (locale: string=envLocale) =>
    cachedEntries<TypeCategorySkeleton>({ content_type: 'category', locale }),
  projects: async (locale: string=envLocale) =>
    cachedEntries<TypeProjectSkeleton>({ content_type: 'project', locale }),
  project: async (query: {[key: string]: string}, locale: string=envLocale) =>
    (await cachedEntries<TypeProjectSkeleton>({ content_type: 'project', ...query, locale })).items[0],
  teamMembers: async (locale: string=envLocale) =>
    cachedEntries<TypeTeamMemberSkeleton>({ content_type: 'teamMember', locale }),
  collaborators: async (locale: string=envLocale) =>
    cachedEntries<TypeCollaboratorSkeleton>({ content_type: 'collaborator', locale }),
  awardsPage: async (locale: string=envLocale) =>
    (await cachedEntries<TypeAwardsPageSkeleton>({ content_type: 'awardsPage', locale })).items[0],
  awards: async (locale: string=envLocale) =>
    cachedEntries<TypeAwardSkeleton>({ content_type: 'award', locale }),
}
