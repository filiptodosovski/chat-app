import { ChatDialog } from '@/domains/chat'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: session } = useSession()

  return (
    <div>
      <ChatDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        username={session?.user?.username}
      />
    </div>
  )
}
export default ChatPage
