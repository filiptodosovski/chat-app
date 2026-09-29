import { Socket } from 'socket.io-client'
import { createSocket } from '@/utils'

export class WebSocketService {
  static instance: WebSocketService
  socket: Socket

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService()
    }
    return WebSocketService.instance
  }

  constructor() {
    this.socket = createSocket()
  }

  connect(token: string) {
    this.socket.auth = { token }
    this.socket.connect()
  }

  disconnect() {
    this.socket.disconnect()
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback)
  }

  off(event: string, callback: (...args: any[]) => void) {
    this.socket.off(event, callback)
  }

  emit(event: string, ...args: any[]) {
    this.socket.emit(event, ...args)
  }
}
