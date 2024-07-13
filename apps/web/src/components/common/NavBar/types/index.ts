import { Session } from 'next-auth'

export interface INavBar {
  session: Session | null
}
