import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen && !isAnimating) return null

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
        isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
      } ${isAnimating ? 'visible' : 'invisible'}`}
      onClick={onClose}
    >
      <div
        className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='bg-white rounded-lg p-6 max-w-lg m-4 flex flex-col'>
          <div className='flex justify-end'>
            <button
              onClick={onClose}
              className='text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-300 hover:bg-gray-200 hover:opacity-80 relative mb-2'
            >
              <span className='inline-block leading-none absolute bottom-2'>
                &times;
              </span>
            </button>
          </div>
          <div className='flex flex-col items-center'>{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!
  )
}

export default Modal
