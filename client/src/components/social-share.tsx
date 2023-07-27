import React, { useState } from "react"
import toast from "react-hot-toast"
import { useClickOutside } from "@/hooks"
import { FacebookIcon, LinkIcon, ShareIcon, TwitterIcon } from "./icons"

type SocialShareLinksProps = {
    tweet: string
    url: string
    // eslint-disable-next-line react/require-default-props
    hashtags?: string[]
}

function SocialShareLinks({
    tweet,
    url,
    hashtags
}: SocialShareLinksProps) {

    function copyToClipboard(shareLink: string): any {
        navigator.clipboard.writeText(shareLink)
        toast.success('Link copied!', {
            position: 'top-center',
        })
    }
    const [showShareOptions, setShowShareOptions] = useState(false)

    const hashtag = hashtags ? `&hashtags=${hashtags.join(',')}` : ''

    const { elementRef } = useClickOutside({ onClickComplete: () => setShowShareOptions(false) })
    // 

    return (
        <div className='relative'>
            <div ref={elementRef} className='post-action' onClick={(e) => {
                e.stopPropagation()
                setShowShareOptions(!showShareOptions)
            }}>
                <ShareIcon />
                Share
            </div>
            {showShareOptions &&
                <div className='absolute z-[1] top-[40px] left-[-1px]'>
                    <div className='flex flex-col border border-medium bg-white w-[120px] shadow-lg text-gray'>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(url)
                                setShowShareOptions(false)
                            }}
                            className="w-full p-2 flex-start justify-center gap-1 hover:bg-primary-light"
                        >
                            <LinkIcon />
                            <span>
                                Copy Link
                            </span>
                        </button>
                        <a
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowShareOptions(false)
                            }}
                            href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                                tweet,
                            )}${hashtag}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full p-2 flex-start justify-center gap-1 hover:bg-primary-light"
                        >
                            <TwitterIcon fill="#7C7C7C" width="1rem" height="1rem" />
                            Twitter
                        </a>
                        <a
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowShareOptions(false)
                            }}
                            href={`https://www.facebook.com/sharer.php?u=${url}&display=page`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full p-2 flex-start justify-center gap-1 hover:bg-primary-light"
                        >
                            <FacebookIcon fill="#7C7C7C" />
                            Facebook
                        </a>
                    </div >
                </div>
            }
        </div>

    )
}


export default SocialShareLinks