import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Button from '@/components/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)



  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  

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
  }, [isOpen, handleKeyDown])

 
  if (!isOpen && !isAnimating) return null

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
        isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
      } ${isAnimating ? 'visible' : 'invisible'}`}
      onClick={onClose}
    >
      <article
        className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='bg-white rounded-lg p-6 max-w-lg m-4 flex flex-col'>
          <div className='flex justify-end'>
            <Button
              variant='icon'
              className='relative mb-2'
              onClick={onClose}
              aria-label='Close modal'
            >
              <span className='inline-block leading-none'>&times;</span>
            </Button>
          </div>
          <div className='flex flex-col items-center'>{children}</div>
        </div>
      </article>
    </section>,
    document.getElementById('modal-root')!
  )
}

export default Modal
