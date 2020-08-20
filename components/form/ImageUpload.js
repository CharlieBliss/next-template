import React, { useCallback, useState, useEffect } from 'react'
import { useField } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog'
import validateMimeType from 'form/validateMimeType'
import validateImage from 'form/validateImage'

import startUpload from 'form/startUpload'
import s3KeyFromUrl from 'form/s3KeyFromUrl'
import getSignedUrl from 'form/getSignedUrl'

import getFilesFromChangeEvent from 'form/getFilesFromChangeEvent'
import ImageCrop from 'components/form/ImageCrop'
import RemoteImage from 'components/base/RemoteImage'
// import FileUpload from 'components/form/FileUpload'

const readFilePromise = file => new Promise((resolve) => {
	const reader = new FileReader()
	reader.addEventListener('load', () => resolve(reader.result), false)
	reader.readAsDataURL(file)
})

export const ImageUpload = ({
	apiKey, helpText, validFormats = 'image/*', addPreSubmitPromise, multiple = false,
	uploadBucket, maxSizeInMb, minWidth, minHeight, imageUuidApiKey, isRounded,
	small, isUploadingListener,
}) => {
	const [fileName, setFileName] = useState('')
	const [fileError, setFileError] = useState()
	const [isUploading, setIsUploading] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [image, setImage] = useState(false)
	const [displayImage, setDisplayImage] = useState()

	const handleModalClose = useCallback(() => {
		setModalOpen(false)
	})

	const { input, meta } = useField(apiKey)
	const {
		value, name, onChange, onBlur, onFocus,
	} = input
	const { input: inputUuid } = useField(imageUuidApiKey)
	const { onChange: onChangeUuid } = inputUuid
	const { touched, error, submitError } = meta
	const errorText = touched && (error || submitError)
	const onCrop = useCallback(async (imageBlob) => {
		isUploadingListener(true)
		setIsUploading(true)
		const uploadPromise = startUpload(imageBlob, uploadBucket)
		addPreSubmitPromise(uploadPromise)
		const { url, uuid } = await uploadPromise
		setIsUploading(false)
		onChange(url)
		onChangeUuid(uuid)
		isUploadingListener(false)
	}, [])

	useEffect(() => {
		if (value) {
			const key = s3KeyFromUrl(value)
			getSignedUrl(uploadBucket, key).then((res) => {
				setDisplayImage(res)
			})
		} else {
			setDisplayImage(null)
		}
	}, [value])

	const handleChange = useCallback(async (event) => {
		setFileError()
		const files = getFilesFromChangeEvent(event)
		const mimeTypeError = false
		const firstFile = files[0]
		const { size: fileSize } = firstFile
		const filesizeError = (
			fileSize > (maxSizeInMb * 1024 * 1024) ? 'filesize' : null
		)
		if (mimeTypeError) {
			setFileError('Invalid file type')
		} else if (filesizeError) {
			setFileError(`File must be under ${maxSizeInMb}MB`)
		} else {
			const imageDataUrl = await readFilePromise(firstFile)
			const imageError = await validateImage(
				imageDataUrl, minWidth, minHeight,
			)
			if (imageError) {
				setFileError(imageError)
			} else {
				setModalOpen(true)
				setImage(imageDataUrl)
				setFileName(firstFile.name)
			}
		}
	}, [])

	const handleClear = useCallback(() => {
		onChange('')
		onChangeUuid('')
		setFileName()
		setDisplayImage()
		setIsUploading(false)
		isUploadingListener(false)
	}, [])

	return (
		<>
			{/* <FileUpload
				name={name}
				value={value}
				onChange={handleChange}
				small={small}
				onClear={handleClear}
				helpText={helpText}
				validFormats={validFormats}
				addPreSubmitPromise={addPreSubmitPromise}
				multiple={multiple}
				uploadBucket={uploadBucket}
				displayImage={displayImage}
				error={fileError || errorText}
				onBlur={onBlur}
				onFocus={onFocus}
				isRounded={isRounded}
			/> */}
			<input
				onChange={handleChange}
				type="file"
				accept="image/*"
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			<div>
				{fileError}
			</div>
			<RemoteImage uuid={inputUuid.value} />
			<ImageCrop
				open={modalOpen}
				onClose={handleModalClose}
				image={image}
				cropShape={isRounded ? 'round' : 'rect'}
				onCrop={onCrop}
				fileName={fileName}
				isUploading={isUploading}
			/>
		</>
	)
}

export default ImageUpload