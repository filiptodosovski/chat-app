import { LABELS } from '@components/common/NavBar/utils/labels'
import { useState } from 'react'
import { Modal } from '@/components'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex justify-between bg-amber-400 h-[50px] border-b-2 border-b-white">
        <div>
          <h1 className="text-textPrimary font-bold mx-2 text-xl mt-2">
            {LABELS.chatApp}
          </h1>
        </div>
        <div className="mx-4 bg-buttonPrimary border-2 px-5 my-1">
          <button
            className="mt-1 font-bold text-textPrimary text-xl"
            onClick={() => setIsOpen(true)}
          >
            {LABELS.signIn}
          </button>
        </div>
      </div>
    </>
  )
}
