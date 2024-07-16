import { type FC } from 'react'
import Image from 'next/image'
import { Dialog } from '@headlessui/react'

interface IChatDialogHeaderProps {
  username: string | undefined
}

export const ChatDialogHeader: FC<IChatDialogHeaderProps> = ({ username }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {username}{' '}
        </Dialog.Title>
      </div>
    </div>
  )
}
