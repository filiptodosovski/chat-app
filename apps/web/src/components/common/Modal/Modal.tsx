import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { IModalProps } from '@components/common/Modal/types'

export const Modal = ({ open, onClose }: IModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          <Description>
            This will permanently deactivate your account
          </Description>
          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed.
          </p>
          <div className="flex gap-4">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onClose}>Deactivate</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
