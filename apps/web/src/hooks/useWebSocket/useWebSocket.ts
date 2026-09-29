import { WebSocketService } from '@services'
import { TMessage } from '@/domains/chat/types'

export const useWebSocket = () => {
  const sendMessage = (content: string) => {
    WebSocketService.getInstance().emit('message', {
      content,
    })
  }

  const listenForMessages = (callback: (message: TMessage) => void) => {
    WebSocketService.getInstance().on('message', callback)

    return () => {
      WebSocketService.getInstance().off('message', callback)
    }
  }

  return {
    sendMessage,
    listenForMessages,
  }
}
