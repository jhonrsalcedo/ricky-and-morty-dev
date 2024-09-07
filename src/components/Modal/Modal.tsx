import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
                } ${isAnimating ? 'visible' : 'invisible'}`}
            onClick={onClose}
        >
            <div
                className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white rounded-lg p-6 max-w-lg w-full m-4">
                    <div className="flex justify-end">
                        <button onClick={onClose} className="text-xl font-bold">&times;</button>
                    </div>
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
}

export default Modal;