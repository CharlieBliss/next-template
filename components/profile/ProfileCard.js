import CardItem from 'components/base/CardItem'


export const ProfileCard = ({
	item = {}, className, emptyListCardText, loading, filterStoreKey,
	index, search, onClick, recordId
}) => {
	const {
		name, skills = [], image_uuid: imageUuid,
	} = item
	const detailRoute = '/profiles/${recordId}'
	return (
		<CardItem
			title={name}
			to={detailRoute}
			search={search}
			titleTo={detailRoute}
			subtitle={skills.join(', ')}
			loading={loading}
			onClick={onClick}
			imageUuid={imageUuid}
			emptyListCardText={emptyListCardText}
			index={index}
		/>
	)
}

export default ProfileCard
