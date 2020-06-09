import { useQuery, queryCache } from 'react-query'
import apiRequest from 'api/apiRequest'

export default function Home() {
  const { status, data, error } = useQuery(
    ['tracks', 832],
    apiRequest({path: 'tracks/832'}),
    {
      initialData: () => {
        return queryCache.getQueryData('tracks')?.find(data => data.id === 832)
      },
    }
  )
  return (
    <>
      <div>
        Hello This is the home page. You dont need to be authenticated to see me.
      </div>
      <div>
        {data?.title}
      </div>
    </>
  )
}
