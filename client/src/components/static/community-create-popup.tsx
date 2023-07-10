import React from 'react'
import { LockIcon, ProfileIcon, RestrictedIcon } from '../icons'

function CommunityCreatePopup({ closeModal }: { closeModal: () => void }) {
  // TODO: handle error typing community name, add func 
  // const [createCommunity, { loading }] = useCreateCommunityMutation()
  // const [updateCommunity, { data }] = useUpdateCommunityMutation()
  // const form = {
  //   name: 'feedback5',
  //   privacyType: "restricted"
  // }

  // const formUpdate = {
  //   privacyType: "restricted"
  // }

  return (
    <><div className='flex-col-start-10 w-[300px] sm:w-[500px]'>
      <h3 className='w-full pb-2 border-b border-b-medium'>Create a community</h3>
      <h3>Name</h3>
      <p className='label-sm font-light'>Community names including capitalization cannot be changed.</p>
      <div className='border border-medium rounde-sm focus:border-black w-full h-[40px] pl-2'>
        <span className='text-light-gray'>r/</span>
        <input type="text" className='h-[95%] my-auto pr-2' /></div>
      <p className='label-sm font-light'>21 Characters remaining</p>
      <h3>Community type</h3>
      <div className='flex-start gap-[5px]'>
        <input type="radio" name="public" id="public" />
        <span className='w-[24px]'><ProfileIcon type='fill' /></span>
        <span className='label-md'>Public</span>
        <span className="label-sm font-light"> Anyone can view, post, and comment to this community</span>
      </div>
      <div className='flex-start gap-[5px]'>
        <input type="radio" name="public" id="public" />
        <span className='w-[24px]'><RestrictedIcon /></span>
        <span className='label-md'>Restricted</span>
        <span className="label-sm font-light"> Anyone can view this community, but only approved users can post</span>
      </div>
      <div className='flex-start gap-[5px]'>
        <input type="radio" name="public" id="public" />
        <span className='w-[24px]'><LockIcon /></span>
        <span className='label-md'>Private</span>
        <span className="label-sm font-light">Only approved users can view and submit to this community</span>
      </div>
    </div>
      <div className='h-[50px] mt-4 flex-end gap-[10px] w-full'>
        <button type="button" className='button-main-outline' onClick={closeModal}>Cancel</button>
        <button type="button" className='button-main'
        // onClick={() => createCommunity({
        //   variables: { input: form }
        // })}
        // {loading ? 'Loading' : 'Create Community'}
        >Create Community</button>
      </div>
    </>
  )
}

export default CommunityCreatePopup