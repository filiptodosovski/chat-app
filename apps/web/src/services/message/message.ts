import { createApiHandler } from '@/services/utils'
import axios from 'axios'
import { IMessage } from '@/services/message/types'

export const getMessage = createApiHandler(async () => {
  const { data } = await axios.get<IMessage[]>('/server/message/all')
  return data
}, ['get_messages'])
