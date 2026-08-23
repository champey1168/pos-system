
import { X } from 'lucide-react'

import Button from './Button.jsx'








export default function Modal({ open, title, children, onClose, footer, labelledBy = 'modal-title' }) {
  
  if (!open) return null
  return (
    
    
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      

      <section className="modal" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        
        <header className="modal-header">
          
          <h2 id={labelledBy}>{title}</h2>
          
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close modal"><X size={20} /></button>
        </header>
        
        <div className="modal-body">{children}</div>
        
        {footer ? <footer className="modal-footer">{footer}</footer> : null}
      </section>
    </div>
  )
}



export function ConfirmModal({ open, title = 'Confirm action', message, onCancel, onConfirm, confirmLabel = 'Confirm' }) {
  return (
    
    <Modal
      open={open}
      title={title}
      
      onClose={onCancel}
      
      footer={<><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button></>}
    >
      
      <p className="muted">{message}</p>
    </Modal>
  )
}
