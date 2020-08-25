// accounts
export const accountApiPath = 'account'

// tracks
export const tracksApiPath = 'tracks'
export const tracksRecordApiPath = recordId => `tracks/${recordId}`
export const tracksLikeApiPath = recordId => `tracks/${recordId}/like`
export const tracksUnlikeApiPath = recordId => `tracks/${recordId}/unlike`
export const tracksCommentsApiPath = recordId => `tracks/${recordId}/comments`
export const tracksLikesListApiPath = recordId => `tracks/${recordId}/likes`
export const trackArtistsApiPath = recordId => `tracks/${recordId}/artists`
export const publishTrackApiPath = recordId => `tracks/${recordId}/publish`
export const trackAddPlayApiPath = recordId => `tracks/${recordId}/play`

// profiles
export const profilesApiPath = 'profiles'
export const profilesRecordApiPath = recordId => `profiles/${recordId}`
export const profilesAboutApiPath = recordId => `profiles/${recordId}/about`
export const profilesLikesListPath = recordId => `profiles/${recordId}/likes`
export const profilesFollowApiPath = recordId => `profiles/${recordId}/follow`
export const profilesUnfollowApiPath = recordId => `profiles/${recordId}/unfollow`
export const profilesFollowersListApiPath = recordId => `profiles/${recordId}/followers`
export const profilesFollowingListApiPath = recordId => `profiles/${recordId}/following`
export const profileFollowingPlaysApiPath = recordId => `profiles/${recordId}/following-plays`
export const createProfileMembersApiPath = recordId => `profiles/${recordId}/members`
export const createProfileBandsApiPath = recordId => `profiles/${recordId}/bands`
export const createProfileTracksApiPath = recordId => `profiles/${recordId}/tracks`

// bands
export const bandsApiPath = 'bands'
export const bandsRecordApiPath = recordId => `bands/${recordId}`
export const bandsPublishApiPath = recordId => `bands/${recordId}/publish`

// track communities
export const createTrackCommunitiesTrackApiPath = recordId => `tracks/${recordId}/communities`

// track genres
export const trackGenresApiPath = 'track-genres'
export const createTrackGenresTrackApiPath = recordId => `tracks/${recordId}/genres`
export const createTrackGenresDetailApiPath = recordId => `track-genres/${recordId}`

// track looking-for
export const trackLookingForApiPath = 'track-looking-for'
export const createTrackLookingForTrackApiPath = recordId => `tracks/${recordId}/looking-for`
export const createTrackLookingForDetailApiPath = recordId => `track-looking-for/${recordId}`

// profile looking-for
export const profileLookingForApiPath = 'profile-looking-for'
export const createProfileLookingForProfileApiPath = recordId => `profiles/${recordId}/looking-for`
export const createProfileLookingForDetailApiPath = recordId => `profile-looking-for/${recordId}`

// profile skills
export const profileSkillApiPath = 'profile-skills'
export const createProfileSkillProfileApiPath = recordId => `profiles/${recordId}/skills`
export const createProfileSkillDetailApiPath = recordId => `profile-skills/${recordId}`

// track collaborators
export const trackCollaboratorsApiPath = 'track-collaborators'
export const createTrackCollaboratorsTrackApiPath = recordId => `tracks/${recordId}/collaborators`
export const createTrackCollaboratorsDetailApiPath = recordId => `track-collaborators/${recordId}`
export const createTrackCollaboratorsRejectApiPath = recordId => `track-collaborators/${recordId}/reject`
export const createTrackCollaboratorsAcceptApiPath = recordId => `track-collaborators/${recordId}/accept`

// band members
export const bandMembersApiPath = 'band-members'
export const createBandMembersBandApiPath = recordId => `profiles/${recordId}/members`
export const createBandMemberDetailApiPath = recordId => `band-members/${recordId}`
export const createBandMemberRejectApiPath = recordId => `band-members/${recordId}/reject`
export const createBandMemberAcceptApiPath = recordId => `band-members/${recordId}/accept`


// comments
export const commentsApiPath = 'comments'
export const commentsRecordApiPath = recordId => `comments/${recordId}`
export const commentsLikeApiPath = recordId => `comments/${recordId}/like`
export const commentsRepliesApiPath = recordId => `comments/${recordId}/replies`

// collections
export const playlistsApiPath = 'playlists'
export const createPlaylistRecordApiPath = recordId => `playlists/${recordId}`
export const createPlaylistRecordTracksApiPath = recordId => `playlists/${recordId}/tracks`
export const createPlaylistAddTrackApiPath = recordId => `playlists/${recordId}/add-track`
export const createPlaylistMoveTrackApiPath = recordId => `playlists/${recordId}/move-track`
export const createPlaylistSuggestedTrackApiPath = recordId => `playlists/${recordId}/suggested-tracks`
export const createPlaylistRecordPublishApiPath = recordId => `playlists/${recordId}/publish`
export const createPlaylistRemoveTrackApiPath = recordId => `playlists/${recordId}/remove-track`
export const myCollectionsApiPath = 'my-collections'
export const collectionsApiPath = 'collections'
export const createCollectionRecordApiPath = recordId => `collections/${recordId}`
export const createCollectionRecordTracksApiPath = recordId => `collections/${recordId}/tracks`
export const createCollectionRecordLikeApiPath = recordId => `collections/${recordId}/like`
export const createCollectionRecordRemoveLikeApiPath = recordId => `collections/${recordId}/remove-like`
export const createMyCollectionRecordApiPath = recordId => `my-collections/${recordId}`
export const createMyCollectionRecordMarkSeenApiPath = recordId => `my-collections/${recordId}/mark-seen`

// static resources
export const communitiesApiPath = 'communities'
export const lookingForTagsApiPath = 'looking-for-tags'
export const trackLookingForTagsApiPath = 'track-looking-for-tags'
export const skillTagsApiPath = 'skill-tags'
export const genresApiPath = 'genres'
export const subgenresApiPath = 'sub-genres'

export const flagsApiPath = 'flags'

export const carouselsApiPath = 'carousels'

export const searchHistoryApiPath = 'searches'
export const createSearchHistoryRecordApiPath = recordId => `searches/${recordId}`
export const createSearchHistoryRecordHideApiPath = recordId => `searches/${recordId}/hide`
