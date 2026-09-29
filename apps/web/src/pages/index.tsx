import { NavBar } from '@components'
import { useSession } from 'next-auth/react'

export const Home = () => {
  const { data: session } = useSession()
  return (
    <>
      <NavBar session={session} />
    </>
  )
}
export default Home
