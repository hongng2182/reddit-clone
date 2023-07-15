import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '@/lib/firebase'

type Props = {
    onUploadComplete: (downloadURL: string) => void
    firebaseFolderName: string
}

const useUploadImage = ({ onUploadComplete, firebaseFolderName }: Props) => {
    // Define photoFile here rather than in the component itself is to keep state of file when upload
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const downloadUrlRef = useRef('')
    const [isUploading, setIsUploading] = useState(false)

    const deleteFirebaseImage = (oldFirebaseImageUrl: string) => {
        // Find old pic
        const oldPhoto = ref(storage, oldFirebaseImageUrl)
        if (oldPhoto.name) {
            // Start deleting
            const desertRef = ref(storage, `${firebaseFolderName}/${oldPhoto.name}`)
            // Delete the file
            deleteObject(desertRef).catch(deleteError => {
                console.log(deleteError)
            })
        }
    }

    const deleteImage = () => {
        setPhotoFile(null)
        // Try delete old  record on Firebase
        try {
            if (downloadUrlRef.current !== '') {
                deleteFirebaseImage(downloadUrlRef.current)
            }
        } catch (deletePhotoError) {
            console.log(deletePhotoError)
        }
    };


    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        // Handle choose and upload file
        const uploadFile = e.target.files
        if (uploadFile) {
            const fileType = uploadFile[0]?.type
            const fileSize = uploadFile[0]?.size
            if (fileType.includes('image') &&
                fileSize > 0 &&
                fileSize < 5 * 1024 * 1000
            ) {
                setPhotoFile(uploadFile[0])
                // Create file name and prepare to upload image to Firebase storage
                const fileName = new Date().getTime() + uploadFile[0].name
                const storageRef = ref(storage, `${firebaseFolderName}/${fileName}`)
                const uploadTask = uploadBytesResumable(storageRef, uploadFile[0])
                setIsUploading(true)
                uploadTask.on('state_changed', {
                    next: snapshot => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log(`Upload file ${progress} %`)
                    },
                    error: errorUpload => {
                        toast.error('Error while uploading your image! Please try again!', {
                            position: 'top-center',
                        })
                        console.log(errorUpload)
                        setIsUploading(false)
                    },
                    complete: async () => {
                        // Upload success, then get photo url and update necessary state
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        downloadUrlRef.current = downloadURL
                        onUploadComplete(downloadURL)
                        setIsUploading(false)
                    },
                })
                // reject if file aren't right format and oversize
            } else {
                toast.error('Please choose the correct image file type and size!', {
                    position: 'top-center',
                })
            }
        }
    };

    return { isUploading, photoFile, deleteImage, handleFileInput, deleteFirebaseImage, setPhotoFile };
}

export default useUploadImage