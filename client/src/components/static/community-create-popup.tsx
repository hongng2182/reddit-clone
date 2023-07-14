/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useCreateCommunityMutation } from '@/generated/graphql'
import { PrivacyType } from '@/types'
import { LockIcon, ProfileIcon, RestrictedIcon } from '../icons'

function CommunityCreatePopup({ closeModal }: { closeModal: () => void }) {
  // React hooks 
  const router = useRouter()
  const [form, setForm] = useState({ name: '', privacyType: PrivacyType.public })
  const [error, setError] = useState('')

  // GraphQL hooks
  const [createCommunity, { loading }] = useCreateCommunityMutation()

  // Utils
  const remainCharacters = 21 - form.name.length

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error !== '') { setError('') }
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    })
    )
  }

  const handleCreateCommunity = async () => {
    const response = await createCommunity({ variables: { input: form } })
    const communityData = response.data?.createCommunity
    if (communityData?.community) {
      closeModal()
      router.push(`/static/r/${communityData?.community.name}`)
    }
    if (communityData?.errors) {
      setError(communityData?.errors)
    }
  }

  return (
    <><div className='flex-col-start-10 w-[300px] sm:w-[500px]'>
      <h3 className='w-full pb-2 border-b border-b-medium'>Create a community</h3>
      <h3>Name</h3>
      <p className='label-sm font-light'>Community names including capitalization cannot be changed.</p>
      {/* Community Name Input */}
      <div className='border border-medium rounded-sm focus:border-black w-full h-[40px] pl-2'>
        <span className='text-light-gray'>r/</span>
        <input
          maxLength={21}
          name="name"
          type="text"
          className='h-[95%] my-auto pr-2'
          onChange={(e) => handleChange(e)}
        /></div>
      <p className={`text-sm font-light ${remainCharacters > 0 ? 'text-primary' : 'text-error'}`}>{remainCharacters} Characters remaining</p>

      {/* Handle Errors */}
      {error && <p className="text-error text-sm">{error}</p>}

      {/* Community Type Radio Buttons */}
      <h3>Community type</h3>
      <div className='flex-start gap-[5px]'>
        {/* Public */}
        <input type="radio" name="privacyType" id="public"
          onChange={(e) => handleChange(e)} value={PrivacyType.public}
          checked={form.privacyType === PrivacyType.public} />
        <span className='w-[24px]'><ProfileIcon type='fill' /></span>
        <label htmlFor="public" className='label-md'>Public</label>
        <span className="label-sm font-light"> Anyone can view, post, and comment to this community</span>
      </div>
      {/* Restricted */}
      <div className='flex-start gap-[5px]'>
        <input type="radio" name="privacyType" id="restricted"
          value={PrivacyType.restricted} onChange={(e) => handleChange(e)}
          checked={form.privacyType === PrivacyType.restricted} />
        <span className='w-[24px]'><RestrictedIcon /></span>
        <label htmlFor="restricted" className='label-md'>Restricted</label>
        <span className="label-sm font-light"> Anyone can view this community, but only approved users can post</span>
      </div>
      {/* Privacy */}
      <div className='flex-start gap-[5px]'>
        <input type="radio" value={PrivacyType.private} name="privacyType" id="private" onChange={(e) => handleChange(e)}
          checked={form.privacyType === PrivacyType.private} />
        <span className='w-[24px]'><LockIcon /></span>
        <label id="public" className='label-md'>Private</label>
        <span className="label-sm font-light">Only approved users can view and submit to this community</span>
      </div>
    </div>
      {/* Cancel and Submit Buttons */}
      <div className='h-[50px] mt-4 flex-end gap-[10px] w-full'>
        <button type="button" className='button-main-outline' onClick={closeModal}>Cancel</button>
        <button type="button" className='button-main' onClick={handleCreateCommunity}>{loading ? 'Loading' : 'Create Community'}
        </button>
      </div>
    </>
  )
}

export default CommunityCreatePopup