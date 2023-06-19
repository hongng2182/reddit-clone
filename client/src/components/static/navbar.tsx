import React, { useState } from 'react'
import Image from 'next/image'
import Feed from './feed'
import { ArrowIcon, DropdownIcon, ProfileIcon, SearchIcon } from '../icons'

function Header() {
    const [inputFocus, setInputFocus] = useState(false)

    return (
        <nav className='h-[48px] flex px-[20px] bg-white gap-[10px]'>
            <div className="grow-[1] inline-flex">
                <div className="flex-start mr-2 md:w-[117px] w-[20px]">
                    <Image
                        height='45'
                        width='0'
                        src='/logo-minireddit.png'
                        alt='logo'
                        sizes='(max-width: 768px) 10%"'
                        className='w-auto'
                    />
                </div>
                <div className="flex-1 flex-center">
                    <Feed />
                </div>
                <div className="flex-[2] flex-center">
                    <div className={`max-w-[690px] min-w-[200px] items-center border border-medium hover-border-blue w-[80%] bg-light rounded-3xl flex gap-[10px] py-1 px-3 relative z-[2] ${inputFocus && 'rounded-b-none'}`}>
                        <SearchIcon />
                        <input type="text" placeholder='Search' className='border-none w-full p-1'
                            onFocus={() => setInputFocus(!inputFocus)}
                            onBlur={() => setInputFocus(!inputFocus)}
                        />
                        {inputFocus && <div className='absolute w-full top-[44px] left-0 bg-white text-gray'>
                            <h4>TRENDING TODAY</h4>
                            <div className="trending-posts-container flex items-center hover:bg-light p-2 cursor-pointer">
                                <div className="left flex-[4]">
                                    <div className='flex'>
                                        <ArrowIcon type='outline' fill='#0079d3' />
                                        <p className='font-bold text-black'>Back mirrow season 6</p>
                                    </div>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium accusantium aliquid tenetur alias eius sequi reiciendis, necessitatibus, eos provident eveniet laudantium, adipisci nam at excepturi hic corrupti culpa doloremque.</p>
                                </div>

                                <div className="flex-1">
                                    <Image
                                        width='0'
                                        height='0'
                                        src='/demo.png'
                                        alt='search-icon'
                                        className='h-auto w-full'
                                        sizes='sizes="(max-width: 768px) 100%"'
                                    />
                                </div>

                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <div className="grow-0 flex-end gap-[1.5rem]">
                <button type="button" className='button-main smM:hidden'>Login</button>
                <div className="flex gap-1">
                    <ProfileIcon />
                    <DropdownIcon />
                </div>
            </div>
        </nav >
    )
}

export default Header