import React from 'react'
import Link from 'next/link'
import { MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '@/generated/graphql'

function Navbar() {
    const { loading, data } = useMeQuery()
    const [logout] = useLogoutMutation()

    let body

    if (loading) {
        body = null
    } else if (!data?.me) {
        body = <>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/login">Login</Link></li>
        </>
    } else {
        body = <>
            <button type="button" className='bg-blue-500  w-[10rem] rounded-xl p-1 text-white'>
                <Link href="/create-post">Create Post</Link>
            </button>
            <li>{data.me.username}</li>
            <li><button
                type="button"
                onClick={() => {
                    logout({
                        update(cache, { data: logoutData }) {
                            if (logoutData?.logout) {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: { me: null }
                                })
                            }
                        }
                    })
                }}>Logout</button></li>
        </>
    }

    return (
        <div className='h-[4rem] bg-blue-200 p-2'>
            <ul className='h-full flex justify-end items-center gap-[10px]'>
                {body}
            </ul>
        </div>
    )
}

export default Navbar