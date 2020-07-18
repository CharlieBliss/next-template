export const streamFeedId = process.env.NEXT_PUBLIC_STREAM_FEED_ID
export const streamKey = process.env.NEXT_PUBLIC_STREAM_KEY


// module.exports = Object.assign(
// 	{
// 		__ENV__: environment,
// 		__APP_NAME__: 'quadio',
// 		__APP_NAME_DISPLAY__: 'Quadio',
// 		__SHA__: process.env.CIRCLE_SHA1 || 'dev',
// 		__IOT_ENDPOINT_DOMAIN__: iotEndpointDomain,
// 		__HOTJAR_ID__: isProduction
// 			? HJ_PRODUCTION_ID : HJ_STAGING_ID,
// 		__GOOGLE_ANALYTICS__: isProduction
// 			? GA_PRODUCTION_ID : GA_STAGING_ID,
// 		__INTERCOM_APP_ID__: isProduction
// 			? 'ghqdl10s'
// 			: 'oxyuchss',
// 		__SEGMENT_SOURCE_ID__: isProduction
// 			? 'MPl8bVQDiAfAS7DBVq1ZgYB6QnxEwnct'
// 			: 'TMfwx7fKX3SuupIHylPHrQbODxucEYxn',
// 		__STREAM_CHAT_TOKEN__: isProduction
// 			? 'x5t3kn7q7pre'
// 			: 'n95scxxctr3c',
// 		__STREAM_FEED_KEY__: isProduction
// 			? 'x5t3kn7q7pre'
// 			: 'n95scxxctr3c',
// 		__STREAM_FEED_ID__: isProduction
// 			? '65690'
// 			: '65263',
// 		__BRANCH_ID__: isProduction
// 			? BRANCH_PROD_ID
// 			: BRANCH_PROD_ID,
// 		__BUGSNAG_API_KEY__: '947e6a90770f931356d5966d7e209ae0',
// 		__APP_VERSION__: `${environment}_${Date.now()}`,
// 		__MEDIA_DOMAIN__: `${envDomainMap[environment]}.media.quadio.com`,
// 		__IMAGE_DOMAIN__: `${envDomainMap[environment]}.images.quadio.com`,
// 		__SEARCH_DOMAIN__: `search-${envDomainMap[environment]}.quadio.com`,
// 		__BANNER_DOMAIN__: `${isProduction ? '' : 'staging.'}banners.quadio.com`,
// 		__CLIENT_DOMAIN__: clientDomainMap[environment],
// 	},
// 	// colorConstants,
// 	// logoConstant,
// 	JSON.parse(appConstants).reduce((result, output) => {
// 		const outputKey = output.OutputKey
// 		if (includes(outputKey, stackOutputVars)) {
// 			return {
// 				[`__${constantCase(outputKey)}__`]: output.OutputValue,
// 				...result,
// 			}
// 		}
// 		return result
// 	}, {}),
// )
