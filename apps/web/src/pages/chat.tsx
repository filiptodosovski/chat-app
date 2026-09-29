import { ChatDialog } from '@/domains/chat'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const ChatPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  const { data: session } = useSession()

  return (
    <div>
      <ChatDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
          router.push('/')
        }}
        username={session?.user?.username}
      />
    </div>
  )
}
export default ChatPage
