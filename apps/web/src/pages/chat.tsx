import { useQuery } from '@tanstack/react-query'
import { DataService } from '@services'
import { useSession } from 'next-auth/react'

const ChatPage = () => {
  const { data: session } = useSession()
  const { data: messages } = useQuery({
    queryFn: DataService.getMessage,
    queryKey: DataService.getMessage.queryKey,
  })

  console.log(messages)
  return <h1>chat page</h1>
}
export default ChatPage
