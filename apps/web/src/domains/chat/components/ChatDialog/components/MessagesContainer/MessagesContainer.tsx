import { type FC } from 'react'
import { TMessage } from '@/domains/chat/types'

interface IMessagesContainerProps {
  messages?: TMessage[]
  isMyMessage: (message: TMessage) => boolean
}

export const MessagesContainer: FC<IMessagesContainerProps> = ({
  messages,
  isMyMessage,
}) => {
  return (
    <div className="mt-5 w-full h-96 overflow-y-scroll flex flex-col gap-5 border-2 rounded-md border-slate-700 p-7">
      {messages?.map((message) =>
        isMyMessage(message) ? (
          <div
            key={message.id}
            className="text-white bg-slate-400 w-7/12 rounded-lg py-2 px-4"
          >
            {message?.content}
          </div>
        ) : (
          <div
            key={message.id}
            className="text-white ml-auto bg-indigo-600 w-7/12 rounded-lg py-2 px-4"
          >
            {message?.content}
          </div>
        ),
      )}
    </div>
  )
}
