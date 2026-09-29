import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
} from 'react'
import { useSession } from 'next-auth/react'
import { useWebSocket } from '@/hooks'
import { WebSocketService } from '@services'

interface IWebSocketProviderProps {
  children: ReactNode
}

type TWebSocketContext = ReturnType<typeof useWebSocket>

const WebSocketContext = createContext<TWebSocketContext | null>(null)

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider',
    )
  }

  return context
}

export const WebSocketProvider: FC<IWebSocketProviderProps> = ({
  children,
}) => {
  const socket = useWebSocket()
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  useEffect(() => {
    if (token) {
      WebSocketService.getInstance().connect(token)
    } else {
      WebSocketService.getInstance().disconnect()
    }

    return () => {
      WebSocketService.getInstance().disconnect()
    }
  }, [token])

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
}
