/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
export const trending_posts = [{
    id: 1,
    topic: 'Tropical storm Bret',
    shortDesc: 'Lorem ipsum dolor sit amet consectetur ad elita dipisidg ffdfgeli tadipis i dfsdf sdfhsd rghfsd dsfjhsdf sdfusdf sdfhsdf sdfhsdf sdf',
    imgUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    community: 'TropicalWeather',
    communityImg: 'https://th.bing.com/th/id/OIP.JeNSCebaWZAc8uvPS94IAAHaHa?pid=ImgDet&rs=1'
},
{ id: 2, topic: 'Missing Titanic sub', shortDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', imgUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80', community: 'titanic', communityImg: 'https://th.bing.com/th/id/OIP.JeNSCebaWZAc8uvPS94IAAHaHa?pid=ImgDet&rs=1' },
{ id: 3, topic: 'Final Fantasy XVI', shortDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...', imgUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80', community: 'FFXVI', communityImg: 'https://th.bing.com/th/id/OIP.JeNSCebaWZAc8uvPS94IAAHaHa?pid=ImgDet&rs=1' },
{ id: 4, topic: 'Bebe Rexha', shortDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...', imgUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80', community: 'PublicFreakout', communityImg: 'https://th.bing.com/th/id/OIP.JeNSCebaWZAc8uvPS94IAAHaHa?pid=ImgDet&rs=1' }]


export const mockup_post_data = {
    id: 1, points: 1523, title: 'Post title Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!', username: 'hongng2182hfg', textSnippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, maiores? Voluptatem dolore temporibus perferendis ipsam facere accusantium numquam quos cupiditate ratione. Nesciunt in saepe nemo perferendis molestias minus autem fugiat!',
    community: 'ressit101',
    createdAt: '16 hours'
}

export const communities_mockup = [{
    imgSrc: '/logo-cat.png',
    name: 'r/community1',
    numOfMember: 125015
}, {
    imgSrc: '/logo-cat.png',
    name: 'r/community2',
    numOfMember: 1584
}, {
    imgSrc: '/logo-cat.png',
    name: 'r/community3',
    numOfMember: 36521
},
{
    imgSrc: '/logo-cat.png',
    name: 'r/community1',
    numOfMember: 125015
}, {
    imgSrc: '/logo-cat.png',
    name: 'r/community2',
    numOfMember: 1584
}, {
    imgSrc: '/logo-cat.png',
    name: 'r/community3',
    numOfMember: 36521
}]


export const postingRules = ['1. Remember the human', '2. Behave like you would in real life', '3. Look for the original source of content', '4. Search for duplicates before posting', '5. Read the community’s rules']

interface Comment {
    author: string;
    authorId: string;
    created: number;
    depth: number;
    id: string,
    "next": null | {
        "id": string,
        "type": "comment"
    },
    "parentId": null | string,
    "permalink": string,
    "prev": null | {
        "id": string,
        "type": "comment"
    },
    "postAuthor": null,
    "postId": string,
    "postTitle": null,
    "score": number,
    "sendReplies": boolean,
    "subredditId": string,
    "voteState": number,
    "media": {
        "richtextContent": string
    },
    "profileImage": string
}

interface CommentMap {
    [key: string]: Comment;
}

export const comments_mockup: CommentMap = {
    "t1_jpzh271": {
        "author": "Ash_797",
        "authorId": "t2_7j4fdcx3",
        "created": 1688041642,
        "depth": 0,
        "id": "t1_jpzh271",
        "next": {
            "id": "t1_jpznxjx",
            "type": "comment"
        },
        "parentId": null,
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzh271/",
        "prev": null,
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": 'Mina was so happy that they were about to adopt her dog, Ray that she had a nose bleed from both her nostrils.Mina was born in San Antonio, Texas.She had a US passport, idk if she still does.Tzuyu once wrote JYP, you b** ch instead of JYP Nation(very close spelling in Korean)Tzuyu once guested on a variety program and told it was boring instead of fun infront of TV Variety veterans(similar pronunciation in Korean)Jeongyeon wanted to become a idol cause her grandmother wanted to see her on TV'
        },
        "profileImage": "https://styles.redditmedia.com/t5_2yhsph/styles/profileIcon_snoo6adc012b-0388-4257-b614-dc530cc6bb25-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=588dd971d3f425c9c247d017d0daf5ed15f21ea6"
    },
    "t1_jpznxjx": {
        "author": "m9rockstar",
        "authorId": "t2_3h4msoim",
        "created": 1688045014,
        "depth": 1,
        "id": "t1_jpznxjx",
        "next": {
            "id": "t1_jq0ufe8",
            "type": "comment"
        },
        "parentId": "t1_jpzh271",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpznxjx/",
        "prev": {
            "id": "t1_jpzh271",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": 'Mina gave up her US passport / citizenship years ago.',
        },
        "profileImage": "https://styles.redditmedia.com/t5_yoxc9/styles/profileIcon_snoo3087e7b5-201a-45c5-a025-70780ca61fcc-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=3bc79119954474807c45331a12c7ee790c084b97"
    },
    "t1_jq0ufe8": {
        "author": "mojojoejo",
        "authorId": "t2_63i1r",
        "created": 1688061722,
        "depth": 2,
        "id": "t1_jq0ufe8",
        "next": {
            "id": "t1_jq1n2nx",
            "type": "comment"
        },
        "parentId": "t1_jpznxjx",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq0ufe8/",
        "prev": {
            "id": "t1_jpznxjx",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "That source 😂😂😂"
        },
        "profileImage": "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png",
    },
    "t1_jq1n2nx": {
        "author": "gorlon25",
        "authorId": "t2_dtstv68mj",
        "created": 1688072532,
        "depth": 2,
        "id": "t1_jq1n2nx",
        "next": {
            "id": "t1_jq2c7ik",
            "type": "comment"
        },
        "parentId": "t1_jpznxjx",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq1n2nx/",
        "prev": {
            "id": "t1_jq0ufe8",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Makes sense, no reason to pay double taxes if you don't actually use the citizenship status at all."
        },
        "profileImage": "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
    },
    "t1_jq2c7ik": {
        "author": "hangth3dj",
        "authorId": "t2_8d6aqbj9",
        "created": 1688083190,
        "depth": 2,
        "id": "t1_jq2c7ik",
        "next": {
            "id": "t1_jq17g50",
            "type": "comment"
        },
        "parentId": "t1_jpznxjx",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq2c7ik/",
        "prev": {
            "id": "t1_jq1n2nx",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Literally the best source to include"
        },
        "profileImage": "https://styles.redditmedia.com/t5_3mjti2/styles/profileIcon_snoo45f89aa4-1846-461e-8315-48f796965975-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=55846c37480e70320d50bda98d0553393ed8954f"
    },
    "t1_jq17g50": {
        "author": "Then_Hand2637",
        "authorId": "t2_uq11rzp4",
        "created": 1688066663,
        "depth": 1,
        "id": "t1_jq17g50",
        "next": {
            "id": "t1_jq1j1fo",
            "type": "comment"
        },
        "parentId": "t1_jpzh271",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq17g50/",
        "prev": {
            "id": "t1_jq2c7ik",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "I love Dahyun’s choreography for Jelly Jelly"
        },
        "profileImage": "https://styles.redditmedia.com/t5_7hz9jz/styles/profileIcon_snoodc41e11b-2699-44ec-abd2-1b4413892bb0-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=5c894fd2aec31428b9a6e9b273656c3aa75ffbe9"
    },
    "t1_jq1j1fo": {
        "author": "ddeka777",
        "authorId": "t2_60e5z2mr",
        "created": 1688071012,
        "depth": 1,
        "id": "t1_jq1j1fo",
        "next": {
            "id": "t1_jpzcnod",
            "type": "comment"
        },
        "parentId": "t1_jpzh271",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq1j1fo/",
        "prev": {
            "id": "t1_jq17g50",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Dahyun choreographed a twice song - Jelly Jelly"
        },
        "profileImage": "https://styles.redditmedia.com/t5_2ik7py/styles/profileIcon_snoo9811d8ac-4f19-491d-9b07-884d1097eaef-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=a61b211d6253b7dd4fe08de560a127d763225673"
    },
    "t1_jpzcnod": {
        "author": "jk_lewds",
        "authorId": "t2_8d3sftb0",
        "created": 1688039178,
        "depth": 0,
        "id": "t1_jpzcnod",
        "next": {
            "id": "t1_jpzd6qr",
            "type": "comment"
        },
        "parentId": null,
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzcnod/",
        "prev": {
            "id": "t1_jq1j1fo",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 112,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Nayeon used to like putting her glasses in the refrigerator. Sana almost drowned in a bathtub. Tzuyu got pee’d on while live by one of Momo’s dogs. Twice used to sneak jokbal through a window during their dorm days. Sana reportedly once did the Twice ‘one in a million ‘ intro while sleepwalking. Jeongyeon was kicked by a horse (poor girl😢). Dahyun wears insoles to appear tallers. Sana is terrified of thunder. Dahyun can fit a Korean coin in her nose. Nayeon is a hazard in the kitchen and is known to have the same sized hands as Shaquille O’Neal. Just off the top of my head."
        },
        "profileImage": "https://styles.redditmedia.com/t5_80face/styles/profileIcon_00nnetn2yc1b1.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4010887b8a84fb4cfd765a70b942a792a6b37fd"
    },
    "t1_jpzd6qr": {
        "author": "jk_lewds",
        "authorId": "t2_8d3sftb0",
        "created": 1688039487,
        "depth": 1,
        "id": "t1_jpzd6qr",
        "next": {
            "id": "t1_jpzeo1i",
            "type": "comment"
        },
        "parentId": "t1_jpzcnod",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzd6qr/",
        "prev": {
            "id": "t1_jpzcnod",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 37,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Jeonyeon and Sana team name is 230 because of their shoe size."
        },
        "profileImage": "https://styles.redditmedia.com/t5_80face/styles/profileIcon_00nnetn2yc1b1.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4010887b8a84fb4cfd765a70b942a792a6b37fd"
    },
    "t1_jpzeo1i": {
        "author": "jk_lewds",
        "authorId": "t2_8d3sftb0",
        "created": 1688040339,
        "depth": 2,
        "id": "t1_jpzeo1i",
        "next": {
            "id": "t1_jpzyq5z",
            "type": "comment"
        },
        "parentId": "t1_jpzd6qr",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzeo1i/",
        "prev": {
            "id": "t1_jpzd6qr",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 38,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Nayeon once had a hard time cutting strawberries and said the knife was dull, she found out she was holding the knife upside down."
        },
        "profileImage": "https://styles.redditmedia.com/t5_80face/styles/profileIcon_00nnetn2yc1b1.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4010887b8a84fb4cfd765a70b942a792a6b37fd"
    },
    "t1_jpzyq5z": {
        "author": "EngrRG",
        "authorId": "t2_2qaz9p3y",
        "created": 1688049663,
        "depth": 1,
        "id": "t1_jpzyq5z",
        "next": {
            "id": "t1_jq18z6u",
            "type": "comment"
        },
        "parentId": "t1_jpzcnod",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzyq5z/",
        "prev": {
            "id": "t1_jpzeo1i",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "I'm sorry same size as shaq?"
        },
        "profileImage": "https://styles.redditmedia.com/t5_sdgmi/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNmFjYjhmYjgyODgwZDM5YzJiODQ0NmY4Nzc4YTE0ZDM0ZWU2Y2ZiN18zMTI5NTk_rare_937fe50a-d2a2-4711-b770-5ebcccab36e6-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=6093a398b890219650c526ff23e5185eede16893"
    },
    "t1_jq18z6u": {
        "author": "beastrickwillis",
        "authorId": "t2_zncjc",
        "created": 1688067245,
        "depth": 2,
        "id": "t1_jq18z6u",
        "next": {
            "id": "t1_jq04y3b",
            "type": "comment"
        },
        "parentId": "t1_jpzyq5z",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq18z6u/",
        "prev": {
            "id": "t1_jpzyq5z",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Nayeon playing the wrong center"
        },
        "profileImage": "https://styles.redditmedia.com/t5_eb1y5/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfYmZkNjcwNjY3MDUzZTUxN2E5N2FmZTU2YzkxZTRmODNmMTE2MGJkM18zMjYzNDI_rare_54998f57-031e-478c-be88-55f5bf4e7bda-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=1f81cccaa0cb4c2431c8d51f754df2b0d3a8692f"
    },
    "t1_jq04y3b": {
        "author": "TWICEfanUK",
        "authorId": "t2_lgcfu7xa",
        "created": 1688052131,
        "depth": 2,
        "id": "t1_jq04y3b",
        "next": {
            "id": "t1_jq09dko",
            "type": "comment"
        },
        "parentId": "t1_jpzyq5z",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq04y3b/",
        "prev": {
            "id": "t1_jq18z6u",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "🤣🤣🤣 that was a little on top but she dies has massive hand 🖐️"
        },
        "profileImage": "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png"
    },
    "t1_jq09dko": {
        "author": "ServantOfNyrro",
        "authorId": "t2_8336inrd",
        "created": 1688053816,
        "depth": 1,
        "id": "t1_jq09dko",
        "next": {
            "id": "t1_jpzvlzr",
            "type": "comment"
        },
        "parentId": "t1_jpzcnod",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq09dko/",
        "prev": {
            "id": "t1_jq04y3b",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Jeongyeon was kicked by a horse (poor girl😢)"
        },
        "profileImage": "https://styles.redditmedia.com/t5_379rgk/styles/profileIcon_snooacafddf7-1d90-4ae5-ae2d-f3e7bd67b458-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=f855db25caa8f6d2ebc706705a7bcb3746623840"
    },
    "t1_jpzvlzr": {
        "author": "EvilBunniis",
        "authorId": "t2_d9iaiwdw0",
        "created": 1688048390,
        "depth": 1,
        "id": "t1_jpzvlzr",
        "next": {
            "id": "t1_jq0ml7l",
            "type": "comment"
        },
        "parentId": "t1_jpzcnod",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzvlzr/",
        "prev": {
            "id": "t1_jq09dko",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "This makes me really look forward to getting to know twice lol"
        },
        "profileImage": "https://styles.redditmedia.com/t5_8l4b8x/styles/profileIcon_snooa310b8c1-6cae-4b17-b386-2baf48b2bad3-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=f8bbf91df66b955266fb1cb8aade956c9fc3c2e1"
    },
    "t1_jq0ml7l": {
        "author": "DambiaLittleAlex",
        "authorId": "t2_14ht0l",
        "created": 1688058795,
        "depth": 1,
        "id": "t1_jq0ml7l",
        "next": {
            "id": "t1_jq1kwg2",
            "type": "comment"
        },
        "parentId": "t1_jpzcnod",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq0ml7l/",
        "prev": {
            "id": "t1_jpzvlzr",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "I always wondered why Nayeon uses gloves in most of their mv or live presentations. She must be very self concious about her hands 😔"
        },
        "profileImage": "https://styles.redditmedia.com/t5_cxb43/styles/profileIcon_snoo76934df8-6078-4368-b55d-f3f7393710f8-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=777d4b8cd91e91b7f792f7f60b5de16768f14a75"
    },
    "t1_jq1kwg2": {
        "author": "barbarapalvinswhore",
        "authorId": "t2_e387kvmd",
        "created": 1688071716,
        "depth": 2,
        "id": "t1_jq1kwg2",      
        "next": {
            "id": "t1_jpzizvr",
            "type": "comment"
        },
        "parentId": "t1_jq0ml7l",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq1kwg2/",
        "prev": {
            "id": "t1_jq0ml7l",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Her hands have a very dedicated fanbase (lesbian kpop twitter)"
        },
        "profileImage": "https://styles.redditmedia.com/t5_57pwnm/styles/profileIcon_snoo818ba9e9-6bd3-49fb-8051-fecc51084181-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=0158d9f8e3d7891408d393a971b94fbb37f1c560"
    },
    "t1_jpzizvr": {
        "author": "Saucy_Totchie",
        "authorId": "t2_n6mml",
        "created": 1688042647,
        "depth": 0,
        "id": "t1_jpzizvr",
        "next": {
            "id": "t1_jq0qire",
            "type": "comment"
        },
        "parentId": null,
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jpzizvr/",
        "prev": {
            "id": "t1_jq1kwg2",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Nayeon doesn't like vegetables which feels very on brand for her.  She refers to herself as high maintainence and seeing how she cuts strawberries I agree (she cut them with the dull end of the knife 💀)."
        },
        "profileImage": "https://styles.redditmedia.com/t5_au2i5/styles/profileIcon_0g2rvuge77x91.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=0ad97aa4522254a74c6c93837c8fc28408c22ecc"
    },
    "t1_jq0qire": {
        "author": "Lilacandbabybluelove",
        "authorId": "t2_dbmodygr",
        "created": 1688060259,
        "depth": 1,
        "id": "t1_jq0qire",
        "next": {
            "id": "t1_jq0uihv",
            "type": "comment"
        },
        "parentId": "t1_jpzizvr",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq0qire/",
        "prev": {
            "id": "t1_jpzizvr",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Nayeon doesn’t like vegetables? I didn’t know! Does she like pick them out of her food or eat them unsatisfyingly?"
        },
        "profileImage": "https://styles.redditmedia.com/t5_4rohmh/styles/profileIcon_43w0v4i3k0e71.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4b8d26082aca4e321aacdf4c1c0683d379730a0"
    },
    "t1_jq0uihv": {
        "author": "Saucy_Totchie",
        "authorId": "t2_n6mml",
       
        "created": 1688061755,
        "depth": 2,
       
        "id": "t1_jq0uihv",
       
        "next": {
            "id": "t1_jq0z6sh",
            "type": "comment"
        },
        "parentId": "t1_jq0qire",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq0uihv/",
        "prev": {
            "id": "t1_jq0qire",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "They were on a radio show in the US and Nayeon was outed as the pickiest eater and said she hates vegetables."
        },
        "profileImage": "https://styles.redditmedia.com/t5_au2i5/styles/profileIcon_0g2rvuge77x91.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=0ad97aa4522254a74c6c93837c8fc28408c22ecc"
    },
    "t1_jq0z6sh": {
        "author": "Lilacandbabybluelove",
        "authorId": "t2_dbmodygr",
        "created": 1688063524,
        "depth": 3,
        
        "id": "t1_jq0z6sh",
      
        "next": {
            "id": "t1_jq13q4a",
            "type": "comment"
        },
        "parentId": "t1_jq0uihv",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq0z6sh/",
        "prev": {
            "id": "t1_jq0uihv",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "This is fake comment"
        },
        "profileImage": "https://styles.redditmedia.com/t5_4rohmh/styles/profileIcon_43w0v4i3k0e71.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4b8d26082aca4e321aacdf4c1c0683d379730a0"
    },
    "t1_jq13q4a": {
        "author": "Saucy_Totchie",
        "authorId": "t2_n6mml",
    
        "created": 1688065232,
        "depth": 4,
       
        "id": "t1_jq13q4a",
       
        "next": {
            "id": "t1_jq1ctxp",
            "type": "comment"
        },
        "parentId": "t1_jq0z6sh",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq13q4a/",
        "prev": {
            "id": "t1_jq0z6sh",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Here's a clip from a YT editor"
        },
        "profileImage": "https://styles.redditmedia.com/t5_au2i5/styles/profileIcon_0g2rvuge77x91.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=0ad97aa4522254a74c6c93837c8fc28408c22ecc"
    },
    "t1_jq1ctxp": {
        "author": "Lilacandbabybluelove",
        "authorId": "t2_dbmodygr",
      
        "created": 1688068687,
        "depth": 5,
       
        "id": "t1_jq1ctxp",
       
        "next": {
            "id": "t1_jq1uewp",
            "type": "comment"
        },
        "parentId": "t1_jq13q4a",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq1ctxp/",
        "prev": {
            "id": "t1_jq13q4a",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Thank you! 😊"
        },
        "profileImage": "https://styles.redditmedia.com/t5_4rohmh/styles/profileIcon_43w0v4i3k0e71.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4b8d26082aca4e321aacdf4c1c0683d379730a0"
    },
    "t1_jq1uewp": {
        "author": "Lilacandbabybluelove",
        "authorId": "t2_dbmodygr",
       
        "created": 1688075464,
        "depth": 5,
       
        "id": "t1_jq1uewp",
      
        "next": {
            "id": "t1_jq2a0a5",
            "type": "comment"
        },
        "parentId": "t1_jq13q4a",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq1uewp/",
        "prev": {
            "id": "t1_jq1ctxp",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Her saying “I hate vegetables” with a smile on her face cracked me up 😂 I love her! ❤️"
        },
        "profileImage": "https://styles.redditmedia.com/t5_4rohmh/styles/profileIcon_43w0v4i3k0e71.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=d4b8d26082aca4e321aacdf4c1c0683d379730a0"
    },
    "t1_jq2a0a5": {
        "author": "jeonghyofiles",
        "authorId": "t2_dk3ptvti8",
        "created": 1688082200,
        "depth": 1,
        "id": "t1_jq2a0a5",
        "next": null,
        "parentId": "t1_jpzizvr",
        "permalink": "/r/twice/comments/14m1780/what_are_some_useless_facts_you_know_about_the/jq2a0a5/",
        "prev": {
            "id": "t1_jq1uewp",
            "type": "comment"
        },
        "postAuthor": null,
        "postId": "t3_14m1780",
        "postTitle": null,
        "score": 1,
        "sendReplies": true,
        "subredditId": "t5_3812p",
        "voteState": 0,
        "media": {
            "richtextContent": "Oh interesting! Do you have the link for the radio show?"
        },
        "profileImage": "https://styles.redditmedia.com/t5_8mfxg5/styles/profileIcon_hom0ltgxse6b1.jpg?width=256&height=256&crop=256:256,smart&v=enabled&s=038340661a49dee97f4aae23d9d7f9ae80343269"
    }
}