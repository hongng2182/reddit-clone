import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useUpdatePostMutation, PostDocument } from '@/generated/graphql'
import { LoadingIcon } from './icons'

function EditPost({ hideEdit, postText, postId }: { hideEdit: () => void, postText: string, postId: number }) {
    const [editText, setEditText] = useState(postText)
    const [updatePost, { loading, error }] = useUpdatePostMutation({
        refetchQueries: [
            { query: PostDocument, variables: { postId } }
        ],
    })

    const handleSubmit = async () => {
        if (editText !== '' && editText !== postText) {
            const response = await updatePost({ variables: { updatePostId: postId, text: editText } })
            const updatedText = response.data?.updatePost?.text
            if (updatedText) {
                toast.success('Successfully update post!')
                hideEdit()
            }
        }
    }
    if (error) {
        toast.error('Error while updating your post!')
    }

    return (<div className='w-full flex-col-start-10'>
        <div className="h-[1px] w-full bg-white" />
        <form className='w-full' onSubmit={(e) => e.preventDefault()}>
            {/* Tabs */}
            <div className='bg-white w-full'>
                <div className='p-2 min-h-[280px]'>
                    {/* Text */}
                    <div className='rounded-sm border border-medium mt-2'>
                        <textarea id="text"
                            name="text"
                            onChange={(e) => setEditText(e.target.value)}
                            value={editText}
                            className=' w-full font-light px-2 py-3 min-h-[150px] focus:outline-none' placeholder='Text'
                        />
                    </div>
                    {/* Post Btn */}
                    <div className='flex-end gap-[10px] p-2'>
                        <button type='button' onClick={hideEdit} className='button-main-outline'>Cancel</button>
                        <button type="submit"
                            disabled={editText === "" || editText === postText} className='button-main'
                            onClick={handleSubmit}
                        >{loading ? <LoadingIcon /> : 'Save'}</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default EditPost