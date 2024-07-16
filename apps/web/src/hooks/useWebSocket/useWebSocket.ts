import { WebSocketService } from '@services'

export const useWebSocket = () => {
  const joinChat = (chatId: number) => {
    WebSocketService.getInstance().emit('joinChat', { chatId })
  }

  const sendMessage = (userId: number | undefined, content: string) => {
    console.log(userId)
    console.log(content)
    WebSocketService.getInstance().emit('message', {
      userId,
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
