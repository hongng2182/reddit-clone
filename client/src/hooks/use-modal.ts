import { useState } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // Disable scrolling on the background
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = ''; // Enable scrolling on the background
    };

    return { isOpen, openModal, closeModal };
};

export default useModal