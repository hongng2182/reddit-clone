import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    modalContent: React.ReactNode;
}

function Modal({ isOpen, closeModal, modalContent }: ModalProps) {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeModal()
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        } else {
            document.removeEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeModal]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling on the background
        } else {
            document.body.style.overflow = ''; // Enable scrolling on the background
        }
    }, [isOpen]);

    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed z-[-1] inset-0 w-full h-full bg-slate-400 opacity-50" onClick={closeModal} />
                    <div className="relative modal bg-white w-fit rounded-lg p-6 z-51">
                        <div className='absolute right-3 top-0 text-gray'>
                            <span className="cursor-pointer text-[25px]" onClick={closeModal}>&times;</span>
                        </div>
                        <div className="mt-3">{modalContent}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;