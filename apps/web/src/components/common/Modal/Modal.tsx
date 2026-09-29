import { Dialog, DialogPanel } from '@headlessui/react'
import { IModalProps } from '@components/common/Modal/types'
import { SignInForm } from '@/domains/auth/components/SignInForm/SignInForm'

export const Modal = ({ open, onClose }: IModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <SignInForm />
        </DialogPanel>
      </div>
    </Dialog>
  )
}
