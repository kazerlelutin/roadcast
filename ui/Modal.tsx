import { ReactNode, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Button } from '@/ui'
import { CloseIcon } from './icons'

interface ModalProps {
  title?: ReactNode
  content: (closeModal: () => void) => ReactNode
  button: ReactNode
  apparenceButton?: boolean
}

export function Modal({ title, content, button, apparenceButton = true }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {apparenceButton ? (
        <Button type="button" onClick={openModal}>
          {button}
        </Button>
      ) : (
        <div onClick={openModal}>{button}</div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-rc-card-bg text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between bg-rc-card-dark p-2 text-lg font-medium uppercase leading-6 text-rc-text"
                  >
                    {title || ''}
                    <div className="m-2 w-[20px] cursor-pointer" onClick={closeModal}>
                      <CloseIcon />
                    </div>
                  </Dialog.Title>

                  <div className="p-2">{content(closeModal)}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
