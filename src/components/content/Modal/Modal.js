'use client'

// components/Modal.js
import React, { useEffect, useRef } from 'react';
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import './Modal.css'

const Modal = ({ isOpen, recipes, onClose }) => {
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

  // if (!isOpen || !recipes) return null;
  if (!recipes) return null;

  return (
    <div className='modalcover' style={modalOverlayStyles}>
      <div className='modalcontain' ref={modalRef} style={{ ...modalContentStyles, transform: 'translateX(100%)', opacity: 0 }}>
        <button onClick={onClose} style={closeButtonStyles}>Close</button>
        <h2>{recipes.title}</h2>
        <img src={recipes.image} alt={recipes.title} style={{ width: '100%', height: 'auto' }} />
        <p><strong>Ready in:</strong> {recipes.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipes.servings}</p>
        <p><strong>Instructions:</strong> {recipes.instructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {recipes.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Modal styles
const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '200'
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '500px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const closeButtonStyles = {
  float: 'right',
  cursor: 'pointer',
  padding: '5px 10px',
};

export default Modal;
