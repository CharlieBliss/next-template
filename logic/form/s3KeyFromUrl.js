export default url => decodeURIComponent(
	url.split('.s3.amazonaws.com/')[1].replace(/\+/g, '%20'),
)
