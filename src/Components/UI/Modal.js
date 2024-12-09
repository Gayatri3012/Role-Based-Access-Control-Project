import './Modal.css'

export default function Modal({children, isOpen,onClose}) {

    if(!isOpen) return null;
    
    return  <div className="modal-overlay" >
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>✖</button>
      {children}
    </div>
  </div>
}