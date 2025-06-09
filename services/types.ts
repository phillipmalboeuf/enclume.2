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
    collaboratorsTitle: EntryFieldTypes.Symbol;
    collaboratorsBody?: EntryFieldTypes.Text;
    collaborators?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>>;
    engagementsTitle: EntryFieldTypes.Symbol;
    engagementsBody: EntryFieldTypes.Text;
    engagements?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeEngagementSkeleton>>;
}

export type TypeAboutPageSkeleton = EntrySkeletonType<TypeAboutPageFields, "aboutPage">;
export type TypeAboutPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAboutPageSkeleton, Modifiers, Locales>;

export interface TypeAwardFields {
    name: EntryFieldTypes.Symbol;
    year: EntryFieldTypes.Symbol;
    photo?: EntryFieldTypes.AssetLink;
    description?: EntryFieldTypes.RichText;
    slider?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeAwardSkeleton = EntrySkeletonType<TypeAwardFields, "award">;
export type TypeAward<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAwardSkeleton, Modifiers, Locales>;

export interface TypeAwardsPageFields {
    introduction: EntryFieldTypes.Text;
    pdf?: EntryFieldTypes.AssetLink;
    informationTitle: EntryFieldTypes.Symbol;
    informationPage?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAwardsPageInformationSkeleton>>;
}

export type TypeAwardsPageSkeleton = EntrySkeletonType<TypeAwardsPageFields, "awardsPage">;
export type TypeAwardsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAwardsPageSkeleton, Modifiers, Locales>;

export interface TypeAwardsPageInformationFields {
    title: EntryFieldTypes.Symbol;
    information?: EntryFieldTypes.RichText;
}

export type TypeAwardsPageInformationSkeleton = EntrySkeletonType<TypeAwardsPageInformationFields, "awardsPageInformation">;
export type TypeAwardsPageInformation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAwardsPageInformationSkeleton, Modifiers, Locales>;

export interface TypeCategoryFields {
    title: EntryFieldTypes.Symbol;
    key: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export interface TypeCollaboratorFields {
    name: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    emailAddress?: EntryFieldTypes.Symbol;
}

export type TypeCollaboratorSkeleton = EntrySkeletonType<TypeCollaboratorFields, "collaborator">;
export type TypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollaboratorSkeleton, Modifiers, Locales>;

export interface TypeContactFields {
    phoneNumber: EntryFieldTypes.Symbol;
    emailAddress: EntryFieldTypes.Symbol;
    address: EntryFieldTypes.Text;
    information?: EntryFieldTypes.RichText;
    socialLinks?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeContactSkeleton = EntrySkeletonType<TypeContactFields, "contact">;
export type TypeContact<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactSkeleton, Modifiers, Locales>;

export interface TypeEngagementFields {
    body: EntryFieldTypes.RichText;
}

export type TypeEngagementSkeleton = EntrySkeletonType<TypeEngagementFields, "engagement">;
export type TypeEngagement<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEngagementSkeleton, Modifiers, Locales>;

export interface TypeHomepageFields {
    title: EntryFieldTypes.Symbol;
    hero: EntryFieldTypes.AssetLink;
    tagline: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Text;
    projects?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
    projectsGridSizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    cta: EntryFieldTypes.Symbol;
}

export type TypeHomepageSkeleton = EntrySkeletonType<TypeHomepageFields, "homepage">;
export type TypeHomepage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomepageSkeleton, Modifiers, Locales>;

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    subTitle?: EntryFieldTypes.Symbol;
    releaseDate?: EntryFieldTypes.Date;
    category?: EntryFieldTypes.EntryLink<TypeCategorySkeleton>;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
    url: EntryFieldTypes.Symbol;
    hero: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.RichText;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    galleryGridSizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    previous: EntryFieldTypes.Symbol;
    next: EntryFieldTypes.Symbol;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;

export interface TypeTeamMemberFields {
    name: EntryFieldTypes.Symbol;
    description: EntryFieldTypes.Symbol;
    emailAddress?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    credentials?: EntryFieldTypes.Object;
    photo: EntryFieldTypes.AssetLink;
}

export type TypeTeamMemberSkeleton = EntrySkeletonType<TypeTeamMemberFields, "teamMember">;
export type TypeTeamMember<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTeamMemberSkeleton, Modifiers, Locales>;
