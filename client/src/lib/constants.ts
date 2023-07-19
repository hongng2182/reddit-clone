import { Feeds } from "@/types"

// Post
export const FETCH_LIMIT = 10

// Images Name
export const defaultCommunityIcon = '/default-community.jpg'
export const defaultProfileIcon = '/default-profile.jpg'
export const defaultDeleteIcon = '/delete-image.png'

export const feeds: Feeds = {
    title: 'FEEDS',
    sub_feed: [{
        icon: '/icons/home-outline.svg',
        iconFill: '/icons/home-fill.svg',
        name: 'Home',
        link: '/static'
    },
    {
        icon: '/icons/arrow-outline.svg',
        iconFill: '/icons/arrow-fill.svg',
        name: 'Popular',
        link: '/static/r/popular'
    }],
}

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
