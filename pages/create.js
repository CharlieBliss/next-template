import { useContext } from 'react'
import { Field } from 'react-final-form'
import { useMutation, queryCache }  from 'react-query'
import Form from 'components/form/Form'
import UploadField from 'components/form/UploadField'
import { AuthContext } from 'pages/_app'
import apiRequest from 'api/apiRequest'

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
	const [mutate] = useMutation(
		({ queryKey, payload, method = "POST", queryParams, activeProfileId }) =>
			apiRequest({path: queryKey, method, queryParams, payload, activeProfileId  })(),
		{
			onSuccess: async (payload) => {
				if (payload) {
					await apiRequest(
						{
							path: `tracks/${payload.id}/publish`,
							method: 'PATCH',
							activeProfileId,
							payload,
						}
					)()
					queryCache.refetchQueries('tracks')
				}
			}
		}
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
								<label>Title</label>
								<Field name="title" component="input" placeholder="title" />
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