import { noop } from 'util/ramdaPlus'

const handleKeyPress = onClick => (e) => {
	e.preventDefault()
	if (e.key === 'Enter' || !e.key) {
		onClick()
	}
}

export default ({
	onClick, children, disabled, classes,
}) => {
	const handleKey = e => (
		disabled || !onClick ? noop : handleKeyPress(onClick)(e)
	)

	return (
		<div
			css={classes}
			onClick={onClick}
			onKeyPress={handleKey}
			tabIndex={0}
			role="button"
		>
			{children}
		</div>
	)
}