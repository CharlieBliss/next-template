import React, { useEffect, useCallback, useState } from 'react'

import { useField } from 'react-final-form'
// import validateMimeType from '@/client/logic/finalForm/validateMimeType'
import getFilesFromChangeEvent from 'form/getFilesFromChangeEvent'
import startUpload from 'form/startUpload'

const UploadField = ({
	fieldKey, helpText, validFormats, multiple = false,
	uploadBucket, maxSizeInMb, addPreSubmitPromise,
}) => {
	const [fileName, setFileName] = useState()
	const [isUploading, setIsUploading] = useState(false)
	const [fileError, setFileError] = useState()
	const { input, meta } = useField(fieldKey)
	const { value, name, onChange, onBlur, onFocus } = input
	const { touched, error, submitError } = meta
	const errorText = touched && (error || submitError)

	const handleChange = useCallback(async (event) => {
		setFileError()
		const files = getFilesFromChangeEvent(event)
		// const mimeTypeError = validateMimeType(validFormats, files)
		const firstFile = files[0]
		const { size: fileSize } = firstFile
		const filesizeError = (
			fileSize > (maxSizeInMb * 1024 * 1024) ? 'filesize' : null
		)
		if (filesizeError) {
			setFileError(`File must be under ${maxSizeInMb}MB`)
		} else {
			setIsUploading(true)
			const uploadPromise = startUpload(firstFile, uploadBucket)
			addPreSubmitPromise(uploadPromise)
			const { url } = await uploadPromise
			setIsUploading(false)
			setFileName(firstFile.name)
			onChange(url)
		}
	}, [])

	const handleClear = useCallback(() => {
		onChange('')
		setFileName()
		setIsUploading(false)
	}, [])

	return (
		<input
			onChange={handleChange}
			type="file"
			accept={validFormats}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	)
}

export default UploadField
