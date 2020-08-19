import React, { useState, useCallback, useMemo } from 'react'
import memoizeWith from 'ramda/src/memoizeWith'
import keys from 'ramda/src/keys'
import join from 'ramda/src/join'
import replace from 'ramda/src/replace'
import split from 'ramda/src/split'
import assocPath from 'ramda/src/assocPath'
import map from 'ramda/src/map'
import forEach from 'ramda/src/forEach'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FORM_ERROR } from 'final-form'
import Validator from 'fastest-validator'

const subscriptions = memoizeWith(
	customSubscriptions => join('-', keys(customSubscriptions)),
	customSubscriptions => ({
		submitting: true,
		submitError: true,
		...customSubscriptions,
	}),
)

const defaultPreSubmitPromises = []

const compiledSchemas = {}
const v = new Validator({
	useNewCustomCheckerFunction: true,
	messages: {
		required: '{field} is required',
		simpleUrl: 'Must be a valid url',
	},
})

const validateForm = (schemaId, schema) => {
	let check = compiledSchemas[schemaId]
	if (!check) {
		check = v.compile(schema)
		compiledSchemas[schemaId] = check
	}
	return (values) => {
		const valid = check(values)
		if (valid === true) {
			return {}
		}
		return valid.reduce((acc, { field, message }) => {
			const fieldPathFn = (key) => {
				// for keys like "web_links[0].url" nested inside an array
				// this fn gives us a useful path: ['web_links', 0, 'url']
				const formatPathString = split('.', replace(/\[([0-9])+\]/, '.$1', key))
				return map(
					value => (Number(value) >= 0 ? Number(value) : value),
					formatPathString,
				)
			}
			return ({
				...acc,
				...assocPath(fieldPathFn(field), message, acc),
			})
		}, {})
	}
}

const undefinedSub = {}
const FormWrapper = ({
	schemaId, schema, initialValues,
	onSubmit = console.info, onSuccess = console.info,
	children, customSubscriptions = undefinedSub, enableMutators,
}) => {
	const [preSubmitPromises, setPreSubmitPromise] = useState(
		defaultPreSubmitPromises,
	)
	const addPreSubmitPromise = useMemo(() => (newPromise) => {
		setPreSubmitPromise([...preSubmitPromises, newPromise])
	}, [preSubmitPromises])

	const validateFn = useCallback(validateForm(schemaId, schema), [schemaId])

	const handleSubmitFn = useCallback(
		async (formData) => {
			try {
				await Promise.all(preSubmitPromises)
				const result = await onSubmit(formData)
				if (result && result.fieldErrors) {
					return result.fieldErrors
				}
				if (result && result['FINAL_FORM/form-error']) {
					return result
				}
				onSuccess({ formData, result })
				return 'Success'
			} catch (error) {
				return {
					[FORM_ERROR]: 'Unknown error, please try submitting again',
				}
			}
		},
		[preSubmitPromises, onSubmit, onSuccess],
	)

	return (
		<Form
			initialValues={initialValues}
			onSubmit={handleSubmitFn}
			validate={validateFn}
			subscription={subscriptions(customSubscriptions)}
			mutators={enableMutators ? arrayMutators : null}
			render={({
				handleSubmit,
				submitting,
				submitError,
				values,
				form: {
					mutators: { push },
				}, // injected from final-form-arrays above
				form,
			}) => {
				const submitAndReset = async (e) => {
					const res = await handleSubmit(e)
					if (res === 'Success') {
						const fields = form.getRegisteredFields()
						form.reset()
						forEach(
							field => form.resetFieldState(field),
							fields,
						)
					}
				}
				return (
					<form onSubmit={submitAndReset}>
						{submitError && (
							<div> {submitError} </div>
						)}
						{children({
							submitting,
							addPreSubmitPromise,
							values,
							formPush: push,
						})}
						Uncomment below to debug form values
						{(() => {
							const { FormSpy } = require('react-final-form')
							return (
								<FormSpy subscription={{ values: true }}>
									{({ values }) => (
										<pre style={{ color: 'white' }}>
											{JSON.stringify(values, 0, 2)}
										</pre>
									)}
								</FormSpy>
							)
						})()}

					</form>
				)
			}}
		/>
	)
}

export default FormWrapper