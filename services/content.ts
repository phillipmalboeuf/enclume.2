
import type { Asset, Entry, EntryCollection } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { contentful } from '@/clients/contentful'
import { GetStaticPropsContext } from 'next'
import { TypeAboutPageSkeleton, TypeAwardSkeleton, TypeAwardsPageSkeleton, TypeCategorySkeleton, TypeCollaboratorSkeleton, TypeContactSkeleton, TypeHomepageSkeleton, TypeProjectSkeleton, TypeTeamMemberSkeleton } from './types'


const envLocale = process.env.LOCALE
const limit = 42

export const ContentService = {
  homepage: async (locale: string=envLocale) =>
    (await contentful.getEntries<TypeHomepageSkeleton>({ content_type: 'homepage', locale })).items[0],
  contact: async (locale: string=envLocale) =>
    (await contentful.getEntries<TypeContactSkeleton>({ content_type: 'contact', locale })).items[0],
  aboutPage: async (locale: string=envLocale) =>
    (await contentful.getEntries<TypeAboutPageSkeleton>({ content_type: 'aboutPage', locale })).items[0],
  categories: async (locale: string=envLocale) =>
    contentful.getEntries<TypeCategorySkeleton>({ content_type: 'category', locale }),
  projects: async (locale: string=envLocale) =>
    contentful.getEntries<TypeProjectSkeleton>({ content_type: 'project', locale }),
  project: async (query: {[key: string]: string}, locale: string=envLocale) =>
    (await contentful.getEntries<TypeProjectSkeleton>({ content_type: 'project', ...query, locale })).items[0],
  teamMembers: async (locale: string=envLocale) =>
    contentful.getEntries<TypeTeamMemberSkeleton>({ content_type: 'teamMember', locale }),
  collaborators: async (locale: string=envLocale) =>
    contentful.getEntries<TypeCollaboratorSkeleton>({ content_type: 'collaborator', locale }),
  awardsPage: async (locale: string=envLocale) =>
    (await contentful.getEntries<TypeAwardsPageSkeleton>({ content_type: 'awardsPage', locale })).items[0],
  awards: async (locale: string=envLocale) =>
    contentful.getEntries<TypeAwardSkeleton>({ content_type: 'award', locale }),
}