import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NetworkStatus } from "@apollo/client"
import { addApolloState, initializeApollo } from "@/lib/apolloClient"
import { PageContainer, PageContentLayout, CreatePostFragment, FilterBox, PostBox, Modal, CommunityCreatePopup } from '@/components'
import { useModal } from '@/hooks'
import { PostsDocument, usePostsQuery } from '@/generated/graphql'

const FETCH_LIMIT = 10

function HomePage() {
    const { isOpen, openModal, closeModal } = useModal()
    const { data, fetchMore, networkStatus } = usePostsQuery({ variables: { first: FETCH_LIMIT, after: null }, notifyOnNetworkStatusChange: true })
    const isLoadingMorePosts = networkStatus === NetworkStatus.fetchMore

    return (
        <PageContainer>
            <PageContentLayout
                containerClassname='mt-[40px]'
                left={<><CreatePostFragment />
                    <FilterBox />
                    {/* POSTS */}
                    <div className='flex-col-start-10 w-full'>
                        {data?.posts.paginatedPosts.map(post => <PostBox key={post.id} post={post} />)}
                        {
                            data?.posts.pageInfo.hasNextPage &&
                            <button
                                type="button"
                                className='button-main'
                                onClick={() => fetchMore({ variables: { first: FETCH_LIMIT, after: data?.posts.pageInfo.endCursor } })}>
                                {isLoadingMorePosts ? 'Loading' : 'Load more'}
                            </button>
                        }
                    </div></>}
                right={<>
                    <div className="h-[40px] bg-primary w-full" />
                    <div className='flex-col-start-10 px-3 py-5'>
                        <div className='w-[35px] h-[35px] bg-medium rounded-full flex-start-10'>
                            <Image
                                width='0'
                                height='0'
                                alt='avatar'
                                sizes='100%'
                                src='/logo-cat.png'
                                className='img-35'
                            />
                            <h3>Home</h3>
                        </div>
                        <p className='text-justify'>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
                        <div className='w-full h-[1px] bg-medium' />
                        <Link href='/static/submit' className='button-main w-full text-center'>Create Post</Link>
                        <button type="button" className='button-main-outline w-full'
                            onClick={openModal}>Create Community</button>
                    </div>
                </>} />
            <Modal isOpen={isOpen}
                closeModal={closeModal}
                modalContent={<CommunityCreatePopup closeModal={closeModal} />}
            />
        </PageContainer>
    )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

    // console.log('context', context)
    const apolloClient = initializeApollo({ headers: context.req.headers })

    await apolloClient.query({
        query: PostsDocument,
        variables: { first: FETCH_LIMIT, after: null }
    })

    return addApolloState(apolloClient, {
        props: {}
    })
}