import React, { useState } from 'react'
import Image from 'next/image'
import { trending_posts } from '@/mockup'
import { ArrowIcon, SearchIcon } from '../icons'

function SearchBar() {
    const [inputFocus, setInputFocus] = useState(false)
    const [value, setValue] = useState('')

  return (
      <div className={`max-w-[690px] min-w-[200px] w-full relative z-[2] ${inputFocus && 'rounded-b-none'}`}>
          <form action='/static/search' autoComplete='off' >
              <div
                  className={`flex-start border bg-light border-medium hover-border-blue rounded-3xl py-1 px-3 ${inputFocus && 'rounded-b-none'}`}
              >
                  <SearchIcon />
                  <input name="q" id='q' type="text" placeholder='Search' className='border-none w-full p-1'
                      value={value}
                      onFocus={() => setInputFocus(!inputFocus)}
                      onChange={(e) => setValue(e.target.value)}
                  />
              </div>
              {inputFocus && <div className='absolute w-full top-[44px] left-0 bg-white text-gray text-sm smM:overflow-scroll smM:h-[400px]'>
                  <h4 className='label-sm px-3 py-2'>TRENDING TODAY</h4>
                  {trending_posts.map(post => <button type="submit"
                      className="hover:bg-light cursor-pointer"
                  >
                      <div className="p-3 flex-start" onClick={() => setValue(post.topic)}>
                          <div className="flex-[4] flex-col-start-10 items-start mr-2">
                              <div className='flex-start-10'>
                                  <div className='w-[20px]'>
                                      <ArrowIcon type='outline' fill='#0079d3' />
                                  </div>
                                  <p className='font-bold text-black'>{post.topic}</p>
                              </div>
                              <p className='text-sm ml-[30px] text-left'>{post.shortDesc}</p>
                              <div className='flex-start text-sm mt-2'>
                                  <Image
                                      height='0'
                                      width='0'
                                      src={post.communityImg}
                                      alt='logo'
                                      sizes='80%'
                                      className='h-[20px] w-[20px] mr-[10px] rounded-full'
                                  />
                                  r/{post.community} and more</div>
                          </div>
                          <div className="flex-1">
                              <Image
                                  width='0'
                                  height='0'
                                  src={post.imgUrl}
                                  alt='search-icon'
                                  className='h-auto w-full rounded-[4px]'
                                  sizes='sizes="(max-width: 768px) 100%"'
                              />
                          </div>
                      </div>
                  </button>
                  )}
              </div>}
          </form>
      </div>
  )
}

export default SearchBar