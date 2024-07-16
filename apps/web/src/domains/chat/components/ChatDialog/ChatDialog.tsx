import { type FC, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataService } from '@services'
import { useUpdate } from '@rounik/react-custom-hooks'
import {
  MessagesContainer,
  ChatDialogHeader,
  ChatDialogFooter,
} from './components'
import { useSession } from 'next-auth/react'
import { useWebSocketContext } from '@/providers'

interface IChatDialogProps {
  open: boolean
  onClose: () => void
  username: string | undefined
}

export const ChatDialog: FC<IChatDialogProps> = ({
  open,
  onClose,
  username,
}) => {
  const [message, setMessage] = useState('')
  const { sendMessage, listenForMessages } = useWebSocketContext()

  const { data: session } = useSession()

  const { data: chat, refetch } = useQuery({
    queryKey: DataService.getMessage.queryKey,
    queryFn: () => DataService.getMessage(),
    enabled: !!session?.user?.username && !!username,
  })

  useUpdate(() => {
    if (chat) {
      listenForMessages(refetch)
    }
  }, [chat])

  const isMyMessage = (email: string) => session?.user?.username === username

  const onHandleSendMessage = () => {
    if (!message) return

    sendMessage(session?.user?.id, message)
    setMessage('')
  }

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ChatDialogHeader username={username} />
                  <MessagesContainer
                    messages={chat}
                    isMyMessage={isMyMessage}
                  />
                  <ChatDialogFooter
                    message={message}
                    onHandleSendMessage={onHandleSendMessage}
                    setMessage={setMessage}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
