import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useSearchCommunitiesLazyQuery } from '@/generated/graphql'
import { defaultCommunityIcon } from '@/lib/constants'
import { CloseIcon, SearchIcon } from './icons'


function SearchBar() {
    const [inputFocus, setInputFocus] = useState(false)
    const [value, setValue] = useState('')
    const [searchCommunities, { data }] = useSearchCommunitiesLazyQuery()
    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    const debouncedSearchCommunities = useCallback(
        debounce((keyword) => {
            searchCommunities({ variables: { keyword, limit: 4 } })
        }, 300),
        []
    )

    useEffect(() => {
        if (data?.searchCommunities)
            setInputFocus(true)
    }, [data?.searchCommunities])

    // Event listener to capture clicks on the document
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setInputFocus(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);


    return (
        <div ref={searchBarRef} className={`max-w-[690px] min-w-[40px] w-full relative z-[2] ${value.length > 0 && 'rounded-b-none'}`}>
            <form action='/search' autoComplete='off' >
                <div
                    className={`flex-start bg-light hover-border-blue focus-within:border-cate-blue rounded-3xl py-1 px-3 ${value.length > 0 && 'rounded-b-none'}`}
                >
                    <SearchIcon />
                    <input name="q" id='q' type="text" placeholder='Search' className='border-none w-full p-1'
                        value={value}
                        onFocus={() => setInputFocus(true)}
                        onChange={(e) => {
                            const keyword = e.target.value;
                            setValue(keyword);
                            debouncedSearchCommunities(keyword);
                        }}
                    />
                    {inputFocus && value.length > 0 && <span className='relative right-2 cursor-pointer' onClick={() => {
                        setInputFocus(false)
                        setValue('')
                    }}><CloseIcon /></span>}
                </div>
                {
                    inputFocus && value.length > 0 && <div className='absolute w-full top-[42px] left-0 bg-white text-sm text-black max-h-[400px] overflow-y-auto border border-medium shadow-2xl'>
                        {data?.searchCommunities?.totalCount === 0 && <p className='text-center'><Link
                            href={`/search/?q=${value}`}
                            onClick={() => setInputFocus(false)} className='flex-start-10 hover:bg-light cursor-pointer w-full p-3'>
                            <SearchIcon />
                            <p className='text-sm'>Search for &ldquo;{value}&ldquo;</p>
                        </Link></p>}
                        {(data?.searchCommunities?.totalCount ?? 0) > 0 &&
                            <div className='flex-col-start-10'>
                                <h4 className='label-md px-3 pt-2'>Communities</h4>
                                {data?.searchCommunities?.communities?.map(community => <Link
                                    href={`/r/${community.name}`}
                                    onClick={() => setInputFocus(false)}
                                    key={community.id}
                                    className='flex-start-10 hover:bg-light cursor-pointer w-full p-2'>
                                    <Image
                                        alt='img'
                                        width='24'
                                        height='24'
                                        src={community.communityIconUrl || defaultCommunityIcon}
                                        className='img-24'
                                    />
                                    <p className='text-sm'>
                                        <p className='font-bold'>r/{community.name}</p>
                                        <p className='text-gray text-xs'>Community • {community.numMembers} members</p>
                                    </p>
                                </Link>)}
                                <Link
                                    href={`/search/?q=${value}`}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/search',
                                            query: { q: value },

                                        })
                                        setInputFocus(false)
                                    }} className='flex-start-10 hover:bg-light cursor-pointer w-full p-3'>
                                    <SearchIcon />
                                    <p className='text-sm'>Search for &ldquo;{value}&ldquo;</p>
                                </Link>
                            </div>
                        }
                    </div>
                }
            </form >
        </div >
    )
}

export default SearchBar