import { Feeds, UserPageTabs } from "@/types"

// Post Fetch Limit
export const FETCH_LIMIT = 10

// Images Name
export const defaultCommunityIcon = '/default-community.jpg'
export const defaultProfileIcon = '/default-profile.jpg'
export const defaultDeleteIcon = '/delete-image.png'

// Default feed tabs
export const feeds: Feeds = {
    title: 'FEEDS',
    sub_feed: [{
        icon: '/icons/home-outline.svg',
        iconFill: '/icons/home-fill.svg',
        name: 'Home',
        link: '/'
    },
    {
        icon: '/icons/arrow-outline.svg',
        iconFill: '/icons/arrow-fill.svg',
        name: 'Popular',
        link: '/r/popular'
    }],
}

// All feed tabs
export const tabs = {
    createCommunity: {
        icon: "/icons/add-outline.svg",
        iconFill: "/icons/add-fill.svg",
        name: "Create Community"
    },
    createPost: {
        icon: "/icons/add-outline.svg",
        iconFill: "/icons/add-fill.svg",
        name: "Create Post"
    },
    home: {
        icon: '/icons/home-outline.svg',
        iconFill: '/icons/home-fill.svg',
        name: 'Home',
    },
    popular: {
        icon: '/icons/arrow-outline.svg',
        iconFill: '/icons/arrow-fill.svg',
        name: 'Popular',
    },
    search: {
        icon: '/icons/search.svg',
        iconFill: '/icons/search.svg',
        name: 'Search Results',
    }
}

// Posting Rules
export const postingRules = ['1. Remember the human', '2. Behave like you would in real life', '3. Look for the original source of content', '4. Search for duplicates before posting', '5. Read the community’s rules']

// Tabs in user page
export const userPageTabs: UserPageTabs[] = [
    {
        name: 'POSTS',
        icon: 'new',
        url: '/user/[username]'
    }, {
        name: 'COMMENTS',
        icon: 'top',
        url: '/user/[username]/comments'
    },
    {
        name: 'UPVOTED',
        icon: 'top',
        url: '/user/[username]/upvotes'
    }, {
        name: 'DOWNVOTED',
        icon: 'top',
        url: '/user/[username]/downvotes'
    }]

export const ArrayOfTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const ArrayOfThree = [1, 2, 3]
export const ArrayOfFive = [1, 2, 3, 4, 5]



