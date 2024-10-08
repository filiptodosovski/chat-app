import { LABELS } from '@components/common/NavBar/utils/labels'
import { useEffect, useState } from 'react'
import { Modal } from '@/components'
import { INavBar } from '@components/common/NavBar/types'
import { signOut } from 'next-auth/react'

export const NavBar = ({ session }: INavBar) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    session && setIsOpen(false)
  }, [session])

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
          {!session ? (
            <button
              className="mt-1 font-bold text-textPrimary text-xl"
              onClick={() => setIsOpen(true)}
            >
              {LABELS.signIn}
            </button>
          ) : (
            <button
              className="mt-1 font-bold text-textPrimary text-xl"
              onClick={() => signOut()}
            >
              {LABELS.signOut}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
