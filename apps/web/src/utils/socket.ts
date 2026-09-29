import { Manager } from 'socket.io-client'

const URL = process.env.NEXT_PUBLIC_WS_URL ?? 'http://localhost:3200'

export const createSocket = () => {
  const manager = new Manager(URL, {
    transports: ['websocket'],
    autoConnect: false,
  })
  return manager.socket('/')
}
