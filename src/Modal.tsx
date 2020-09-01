import React from 'react';
import './Modal.scss';

type ModalProps = {
    className?: string
    onClick(): void
    children?: React.ReactNode
}

export default function Modal({ onClick, children, className }: ModalProps) {
    return <div className="Modal" onClick={onClick}>

        <div className={"modal-content " + (className ?? "")} onClick={e => e.stopPropagation()}>
            {children}
        </div>
        
    </div>
}