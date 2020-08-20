import { useContext, useState } from 'react'
import { useMutation, queryCache } from 'react-query'
import Form from 'components/form/Form'
import UploadField from 'components/form/UploadField'
import { AuthContext } from 'pages/_app'
import apiRequest from 'api/apiRequest'
import InputField from 'components/form/InputField'
import TextAreaField from 'components/form/TextAreaField'
import AutoCompleteField from 'components/form/AutoCompleteField'
import RadioField from 'components/form/RadioField'
import ImageUpload from 'components/form/ImageUpload'
import { publicAssetBucket } from 'envDefaults'

const rawAudioBucketName = process.env.NEXT_PUBLIC_AWS_RAW_AUDIO

const validationSchema = {
	source_url: {
		type: 'string',
		required: true,
		messages: {
			required: 'A valid audio file is required',
		},
	},
	title: {
		type: 'string',
		required: true,
		max: 200,
		messages: {
			stringMax: 'Title must be fewer than 200 characters',
			required: 'Title is required',
		},
	},
	description: {
		type: 'string',
		max: 1000,
		optional: true,
		messages: {
			stringMax: 'Description must be fewer than 1000 characters',
		},
	},
}

const Create = () => {
	const { activeProfileId } = useContext(AuthContext)
	const [isUploading, setIsUploading] = useState(false)
	const [mutate] = useMutation(
		({ queryKey, payload, method = "POST", queryParams }) =>
			apiRequest({path: queryKey, method, queryParams, payload, activeProfileId }),
		{
			onSuccess: async (payload) => {
				if (payload) {
					await apiRequest(
						{
							path: `tracks/${payload.id}/publish`,
							method: 'PATCH',
							activeProfileId,
							payload,
						},
					)
					queryCache.refetchQueries('tracks')
				}
			},
		},
	)

	const onSubmit = async (payload) => {
		const res = await mutate({ queryKey: 'tracks', payload, activeProfileId })
	}

	return (
		<Form
			onSubmit={onSubmit}
			// onSuccess={onSuccess}
			// initialValues={initialValues}
			schemaId="createTrackForm"
			schema={validationSchema}
		>
			{
				({ submitting, addPreSubmitPromise }) => {
					const disabled = submitting
					return (
						<div>
							<h2> Upload Track </h2>
							<div>
									<label>Upload</label>
									<UploadField
										addPreSubmitPromise={addPreSubmitPromise}
										uploadBucket={rawAudioBucketName}
										maxSizeInMb={1000}
										fieldKey="source_url"
									/>
							</div>
							<div>

								<InputField label="Title" apiKey="title" />
							</div>
							<div>
								<TextAreaField label="Description" apiKey="description" />
							</div>
							<div>
								<TextAreaField label="Caption" apiKey="caption" />
							</div>
							<div>
								<AutoCompleteField path="sub-genres" label="Genre" apiKey="genre" />
							</div>
							<div>
								<RadioField label="Status" apiKey="status" options={
									[
										{
											value: 'wip',
											label: 'Work in Progress'
										},
										{
											value: 'complete',
											label: 'Complete',
										},
									]
								} />
							</div>
							<div>
								<RadioField
									label="Privacy Settings"
									apiKey="public"
									options={
										[
											{
												value: true,
												label: 'Public'
											},
											{
												value: false,
												label: 'Private',
											},
										]
									}
								/>
							</div>
							<div>
								<AutoCompleteField
									path="profiles"
									label="Add Collaborators"
									apiKey="collaborators"
									multi
								/>
							</div>
							<div>
								<ImageUpload
									apiKey="image_url"
									imageUuidApiKey="image_uuid"
									isUploadingListener={setIsUploading}
									addPreSubmitPromise={addPreSubmitPromise}
									uploadBucket={publicAssetBucket}
								/>
							</div>
							<button type="submit">Submit</button>
						</div>
					)
				}
			}
		</Form>
	)
}

export default Create