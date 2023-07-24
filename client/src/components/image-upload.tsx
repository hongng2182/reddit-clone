/* eslint-disable react/require-default-props */
import React, { useMemo, useRef, ChangeEvent } from 'react'
import Image from 'next/image'
import { DeleteIcon, UploadIcon } from './icons'

type Props = {
  photoFile: File | null
  handleFileInput: (e: ChangeEvent<HTMLInputElement>) => void
  isUploading: boolean
  onDeleteImage?: () => void
}

function ImageUpload({ photoFile, handleFileInput, isUploading, onDeleteImage }: Props) {
  // Input file ref for open browsefile when click on container box 
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleOpenFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  // Memorize image to prevent re-render when description change
  const memoizedImage = useMemo(() => (
    photoFile && <Image
      className='relative rounded-[0.75rem] md:w-[298px] h-[198px] object-cover object-[center,top] bg-medium'
      src={URL.createObjectURL(photoFile)}
      alt="avatar"
      width={298}
      height={198}
    />
  ), [photoFile]);


  return (
    <div className='m-[15px]'>
      <div className='flex-center flex-col'>
        <div className='md:flex-center md:gap-[1.5rem]'>
          {!photoFile && <div className=' flex-col-center-10 justify-center rounded-[0.75rem] border border-medium md:w-[300px] h-[200px] cursor-grabbing'
            onClick={() => handleOpenFile()}
          >
            <UploadIcon width={50} height={50} className='mx-auto' />
            <p className="label-md-gray"> Drag & drop or upload image file here </p>
            <input
              className='hidden'
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={handleFileInput}
            />
          </div>}
          {photoFile && <div className='border relative border-medium rounded-[0.75rem] md:w-[300px] h-[200px]'>
            {memoizedImage}
            <div className='flex-end h-[15%] pr-2'>
              <button type="button" onClick={onDeleteImage}>
                <DeleteIcon fill='#dd2c00' />
              </button>
            </div>
            {isUploading && <div className='absolute inset-0 w-full h-full flex-center bg-light'>Loading</div>}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload