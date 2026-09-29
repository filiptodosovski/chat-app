import { WebSocketService } from '@services'

export const useWebSocket = () => {
  const joinChat = (chatId: number) => {
    WebSocketService.getInstance().emit('joinChat', { chatId })
  }

  const sendMessage = (content: string) => {
    WebSocketService.getInstance().emit('message', {
      content,
    })
  }

  const listenForMessages = (callback: () => void) => {
    WebSocketService.getInstance().on('message', callback)
  }

  return {
    joinChat,
    sendMessage,
    listenForMessages,
  }
}
