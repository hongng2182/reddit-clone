
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useCreatePostMutation } from '../generated/graphql'

function CreatePost() {
    const router = useRouter()
    const [form, setForm] = useState({ title: '', text: '' })
    const [createPost, { loading, error }] = useCreatePostMutation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }


    if (loading) { return <div>Loading</div> }

    if (error) {
        return <div>An error has happened!</div>
    }


    return (
        <div>
            <h1 className='font-bold text-center text-xl'>Create Post</h1>
            <form
                className='flex flex-col gap-[10px]'
                onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                        const response = await createPost({
                            variables: { input: form }
                        })
                        if (response.data?.createPost) {
                            router.push('/')
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
                }
            >
                <label htmlFor='title'>Title
                    <input id="title" type="text" name="title" value={form.title}
                        onChange={(e) => handleChange(e)} />
                </label>


                <label htmlFor='text'>Post Content
                    <input
                        id="text"
                        type="text"
                        name="text"
                        onChange={(e) => handleChange(e)}
                        value={form.text}
                    />
                </label>
                <button type="submit" className='bg-blue-500  w-[5rem] rounded-xl p-1 text-white'>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost
