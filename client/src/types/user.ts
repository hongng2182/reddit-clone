export type MeData = {
    __typename?: "User" | undefined;
    id: number;
    username: string;
    email: string;
    profileUrl?: string | null | undefined;
}

export type Feeds = {
    title: string,
    sub_feed:
    { icon: string, name: string, iconFill: string, link: string }[],
}

export type FeedTab = {
    icon: string,
    iconFill: string | null,
    name: string
}

export type UserPageTabs = {
    name: string, icon: string, url: string
}