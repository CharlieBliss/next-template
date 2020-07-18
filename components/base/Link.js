import { useRouter } from 'next/router'

function ActiveLink({ children, href, onClick = () => {} }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
  e.preventDefault()
  if(onClick){
    onClick()
  }
  if(href){
    router.push(href)
  }
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink