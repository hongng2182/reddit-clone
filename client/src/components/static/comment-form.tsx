/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    initialValue: string
    onSubmit: (message: string) => void
    isReply?: boolean
    isEdit?: boolean
    onCancel?: () => void
}

function CommentForm({ initialValue, onSubmit, isReply, isEdit, onCancel }: Props) {
    const [message, setMessage] = useState(initialValue)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message === '') {
            toast.error("Message can't be empty!")
            return
        }
        onSubmit(message)
        setMessage('')
    }
    return (
        <form className='w-full relative mb-2' onSubmit={handleSubmit}>
            {isReply && <div className='absolute h-full w-[2px] bg-medium' />}
            <div className={`rounded-sm border border-medium my-2 ' ${isReply && 'ml-[10px]'}`}>
                <textarea name="create-post"
                    className=' w-full font-light px-2 py-3 h-[70px] focus:outline-none'
                    placeholder='What are your thoughts?'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className='flex-end gap-[10px] p-2 bg-light'>
                    {(isReply || isEdit) && <button type="button"
                        onClick={onCancel && onCancel} className='button-main-outline'>Cancel</button>}
                    <button type="submit"
                        className='button-main'>
                        {isReply && 'Reply'}
                        {isEdit && 'Save'}
                        {!isReply && !isEdit && 'Comment'}
                    </button>
                </div>
            </div>
        </form>
    )
}

CommentForm.defaultProps = {
    isReply: false,
    isEdit: false
}

export default CommentForm