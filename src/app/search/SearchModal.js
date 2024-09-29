import React, { useRef } from 'react';
import './SearchModal.css'; // Import the CSS file

export default function SearchModal({ isOpen, recipe, onClose }) {
  if (!isOpen || !recipe) return null;

  const modalRef = useRef();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Slide in when modal opens
      gsap.to(modalRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    } else if (isOpen === false) {
      // Slide out when modal closes and call onClose after the animation
      gsap.to(modalRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          // Ensure the modal closes after the animation is finished
          onClose();
        },
      });
    }
  }, [isOpen, onClose]);


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 'auto' }} />
        
        {/* Add other recipe details here */}
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
        <p><strong>Instructions:</strong> {recipe.instructions || 'No instructions available'}</p>
      </div>
    </div>
  );
}
