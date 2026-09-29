import { createApiHandler, apiClient } from '@/services/utils'
import { IMessage } from '@/services/message/types'

export const getMessage = createApiHandler(async () => {
  const { data } = await apiClient.get<IMessage[]>('/server/message/all')
  return data
}, ['get_messages'])
