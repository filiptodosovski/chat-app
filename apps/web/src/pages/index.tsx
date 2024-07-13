import { NavBar } from '@components'
import { useSession } from 'next-auth/react'

export const Home = () => {
  const { data: session } = useSession()
  return (
    <>
      {session && console.log(session)}
      <NavBar session={session} />
    </>
  )
}
export default Home
