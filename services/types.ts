import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAboutPageFields {
    intro: EntryFieldTypes.Text;
    introBodyLeft?: EntryFieldTypes.RichText;
    introBodyRight?: EntryFieldTypes.RichText;
    categoriesTitle: EntryFieldTypes.Symbol;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
    teamTitle: EntryFieldTypes.Symbol;
    teamBody?: EntryFieldTypes.Text;
    teamMembers?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTeamMemberSkeleton>>;
    conclusion?: EntryFieldTypes.RichText;
    collaboratorsTitle: EntryFieldTypes.Symbol;
    collaboratorsBody?: EntryFieldTypes.Text;
    collaborators?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>>;
    engagementsTitle: EntryFieldTypes.Symbol;
    engagementsBody: EntryFieldTypes.Text;
    engagements?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEngagementSkeleton>>;
}

export type TypeAboutPageSkeleton = EntrySkeletonType<TypeAboutPageFields, "aboutPage">;
export type TypeAboutPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAboutPageSkeleton, Modifiers, Locales>;

export function isTypeAboutPage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAboutPage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'aboutPage'
}

export interface TypeAwardFields {
    name: EntryFieldTypes.Symbol;
    year: EntryFieldTypes.Symbol;
    photo?: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
    slider?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeAwardSkeleton = EntrySkeletonType<TypeAwardFields, "award">;
export type TypeAward<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAwardSkeleton, Modifiers, Locales>;

export function isTypeAward<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAward<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'award'
}

export interface TypeAwardsPageFields {
    introduction: EntryFieldTypes.Text;
    pdf?: EntryFieldTypes.AssetLink;
    informationTitle: EntryFieldTypes.Symbol;
    informationPage?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAwardsPageInformationSkeleton>>;
}

export type TypeAwardsPageSkeleton = EntrySkeletonType<TypeAwardsPageFields, "awardsPage">;
export type TypeAwardsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAwardsPageSkeleton, Modifiers, Locales>;

export function isTypeAwardsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAwardsPage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'awardsPage'
}

export interface TypeAwardsPageInformationFields {
    title: EntryFieldTypes.Symbol;
    information?: EntryFieldTypes.RichText;
}

export type TypeAwardsPageInformationSkeleton = EntrySkeletonType<TypeAwardsPageInformationFields, "awardsPageInformation">;
export type TypeAwardsPageInformation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAwardsPageInformationSkeleton, Modifiers, Locales>;

export function isTypeAwardsPageInformation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAwardsPageInformation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'awardsPageInformation'
}

export interface TypeCategoryFields {
    title: EntryFieldTypes.Symbol;
    key: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export function isTypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategory<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'category'
}

export interface TypeCollaboratorFields {
    name: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    emailAddress?: EntryFieldTypes.Symbol;
}

export type TypeCollaboratorSkeleton = EntrySkeletonType<TypeCollaboratorFields, "collaborator">;
export type TypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCollaboratorSkeleton, Modifiers, Locales>;

export function isTypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCollaborator<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'collaborator'
}

export interface TypeContactFields {
    phoneNumber: EntryFieldTypes.Symbol;
    emailAddress: EntryFieldTypes.Symbol;
    address: EntryFieldTypes.Text;
    information?: EntryFieldTypes.RichText;
    socialLinks?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeContactSkeleton = EntrySkeletonType<TypeContactFields, "contact">;
export type TypeContact<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeContactSkeleton, Modifiers, Locales>;

export function isTypeContact<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeContact<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'contact'
}

export interface TypeEngagementFields {
    body: EntryFieldTypes.RichText;
}

export type TypeEngagementSkeleton = EntrySkeletonType<TypeEngagementFields, "engagement">;
export type TypeEngagement<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEngagementSkeleton, Modifiers, Locales>;

export function isTypeEngagement<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeEngagement<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'engagement'
}

export interface TypeEngagementsPageFields {
    introduction?: EntryFieldTypes.RichText;
    engagements?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEngagementSkeleton>>;
}

export type TypeEngagementsPageSkeleton = EntrySkeletonType<TypeEngagementsPageFields, "engagementsPage">;
export type TypeEngagementsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEngagementsPageSkeleton, Modifiers, Locales>;

export function isTypeEngagementsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeEngagementsPage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'engagementsPage'
}

export interface TypeHomepageFields {
    title: EntryFieldTypes.Symbol;
    hero: EntryFieldTypes.AssetLink;
    tagline: EntryFieldTypes.Symbol;
    introduction?: EntryFieldTypes.RichText;
    gallerie?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    description: EntryFieldTypes.Text;
    projects?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
    projectsGridSizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    cta: EntryFieldTypes.Symbol;
}

export type TypeHomepageSkeleton = EntrySkeletonType<TypeHomepageFields, "homepage">;
export type TypeHomepage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHomepageSkeleton, Modifiers, Locales>;

export function isTypeHomepage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHomepage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'homepage'
}

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    subTitle?: EntryFieldTypes.Symbol;
    releaseDate?: EntryFieldTypes.Date;
    category?: EntryFieldTypes.EntryLink<TypeCategorySkeleton>;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
    url: EntryFieldTypes.Symbol;
    hero: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.RichText;
    table: EntryFieldTypes.RichText;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    galleryGridSizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    previous: EntryFieldTypes.Symbol;
    next: EntryFieldTypes.Symbol;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;

export function isTypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProject<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'project'
}

export interface TypeTeamMemberFields {
    name: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    emailAddress?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    credentials?: EntryFieldTypes.Object;
    photo: EntryFieldTypes.AssetLink;
}

export type TypeTeamMemberSkeleton = EntrySkeletonType<TypeTeamMemberFields, "teamMember">;
export type TypeTeamMember<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTeamMemberSkeleton, Modifiers, Locales>;

export function isTypeTeamMember<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeTeamMember<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'teamMember'
}
