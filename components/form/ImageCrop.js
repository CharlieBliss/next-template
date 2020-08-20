import React, { useState, useCallback, useEffect } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import cropImage from 'form/cropImage'
import Body30 from 'components/typography/Body30'
import Remove from '@material-ui/icons/Remove'
import Add from '@material-ui/icons/Add'

const cropWrapper = css`
	height: 50em;
	width: 25em;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`

const sliderFlex = css`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`

const defaultCrop = { x: 0, y: 0 }
export default ({
	onCrop, image, fileName, cropShape = '', closeModal, open, onClose,
}) => {
	const [imageCrop, setimageCrop] = useState(image)
	const [crop, setCrop] = useState(defaultCrop)
	const [zoom, setZoom] = useState(1)
	const [rotation, setRotation] = useState(0)

	const handleStateCrop = (areaCrop, areaPixels) => setimageCrop(areaPixels)
	const handleSliderChange = (event, value) => setZoom(value / 10)
	const handleSliderIncrease = () => {
		if (zoom >= 1 && zoom < 6) {
			return setZoom(zoom + 0.1)
		}
		return null
	}
	const handleSliderDecrease = () => {
		if (zoom > 1 && zoom <= 6) {
			return setZoom(zoom - 0.1)
		}
		return null
	}
	const handleRotationChange = (event, value) => setRotation(value)
	const handleRotationIncrease = () => (
		rotation < 360 ? setRotation(rotation + 1) : null
	)
	const handleRotationDecrease = () => (
		rotation > 0 ? setRotation(rotation - 1) : null
	)

	useEffect(() => {
		setCrop(defaultCrop)
		setZoom(1)
		setRotation(0)
	}, [image])

	const handleCrop = useCallback(async () => {
		const imageBlob = await cropImage(
			image, imageCrop, fileName, rotation,
		)
		// onClose()
		onCrop(imageBlob)
	})
	return (
		<Dialog
			open={open}
			onClose={onClose}
		>
			<div css={cropWrapper}>
				<Cropper
					image={image}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					onCropChange={setCrop}
					onCropComplete={handleStateCrop}
					onZoomChange={setZoom}
					cropShape={cropShape}
				/>
				<Body30>
					ZOOM
				</Body30>
				<div css={sliderFlex}>
					<IconButton
						onClick={handleSliderDecrease}
					>
						<Remove />
					</IconButton>
					<Slider
						min={10}
						max={60}
						onChange={handleSliderChange}
						value={zoom * 10}
					/>
					<IconButton
						onClick={handleSliderIncrease}
					>
						<Add />
					</IconButton>
				</div>
				<Body30>
					ROTATION
				</Body30>
				<div css={sliderFlex}>
					<IconButton
						onClick={handleRotationDecrease}
					>
						<Remove />
					</IconButton>
					<Slider
						min={0}
						max={360}
						onChange={handleRotationChange}
						value={rotation}
					/>
					<IconButton
						onClick={handleRotationIncrease}
					>
						<Add />
					</IconButton>
				</div>
				<Button
					onClick={closeModal}
					type="secondary"
				>
					Cancel
				</Button>
				<Button
					onClick={handleCrop}
				>
					Save
				</Button>
			</div>
		</Dialog>
	)
}
