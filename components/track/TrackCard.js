import dayjs from 'dayjs'
import CardItem from 'components/base/CardItem'

export const TrackCard = ({
	item = {}, className, emptyListCardText, showPassport, loading, filterStoreKey,
	index, search, onClick,
}) => {
	const {
		title, wip, listener_id: passportRecordId,
		listener_name: passportTitle, listener_image_uuid: passportSrc, played,
		liked, campaigns, id, image_uuid: imageUuid,
	} = item
	const passportSubtitle = dayjs(played).fromNow()
	const detailRoute = `/tracks/${id}`
	const passportTo = `/profiles/${passportRecordId}`

	return (
		<CardItem
			title={title}
			to={detailRoute}
			onClick={onClick}
			titleTo={detailRoute}
			imageUuid={imageUuid}
			wip={wip}
			search={search}
			collaborators
			campaigns={campaigns}
			showPassport={showPassport}
			loading={loading}
			filterStoreKey={filterStoreKey}
			liked={liked}
			recordId={id}
			passportRecordId={passportRecordId}
			passportSrc={passportSrc}
			passportTitle={passportTitle}
			passportSubtitle={passportSubtitle}
			passportTo={passportTo}
			className={className}
			emptyListCardText={emptyListCardText}
			index={index}
		/>
	)
}

export default TrackCard