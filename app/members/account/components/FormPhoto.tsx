'use client'

import { useRef, useState } from 'react'

// hooks
import useAlert from '@hooks/useAlert'

// components
import Loader from '@components/Loader/Loader'
import ProfilePhoto from '@components/Profile/ProfilePhoto'

// utils
import Request, { type IRequest, type IResponse } from '@utils/Request'

// interfaces
interface IProps {
  data: string // initial image URL
}

const FormPhoto: React.FC<IProps> = ({ data }) => {
  const { showAlert, hideAlert } = useAlert()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string>(data)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault()
    hideAlert()
    setLoading(true)

    const file = inputRef.current?.files?.[0]

    if (!file) {
      showAlert({ type: 'error', text: 'Please select an image file.' })
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    const parameters: IRequest = {
      url: '/api/photo', // adjust based on your API
      method: 'PATCH',
      formData, //
    }

    const req: IResponse = await Request.getResponse(parameters)
    const { status, data: responseData } = req

    if (status === 200) {
      showAlert({ type: 'success', text: 'Photo updated successfully.' })
      if (responseData?.imageUrl) {
        setPreview(responseData.imageUrl) // update preview with new image URL
      }
    } else {
      showAlert({ type: 'error', text: responseData?.title ?? 'Failed to upload photo' })
    }

    setLoading(false)
  }

  if (loading) {
    return <Loader type="inline" color="white" text="Uploading your photo..." />
  }

  return (
    <form noValidate onSubmit={(e) => void handleSubmit(e)}>
      <div className="upload-picture">
        <input
          ref={inputRef}
          type="file"
          name="image"
          id="image"
          className="input-file"
          accept="image/jpeg,image/jpg,image/png"
        />
        <label htmlFor="image">
          <span className="material-symbols-outlined">add_a_photo</span>
        </label>
        <ProfilePhoto image={preview} size="large" />
        <span className="muted">Click picture to change</span>
      </div>
    </form>
  )
}

export default FormPhoto
