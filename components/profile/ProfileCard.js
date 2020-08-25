import CardItem from 'components/base/CardItem'

export const ProfileCard = ({
	record = {}, emptyListCardText, loading,
	index, search, onClick, recordId,
}) => {
	const {
		name, skills = [], image_uuid: imageUuid, id,
	} = record
	const detailRoute = `/profiles/${recordId}`
	return (
		<CardItem
			title={name}
			recordId={id}
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
