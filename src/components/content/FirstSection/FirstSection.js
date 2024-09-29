'use client'

import React, { useState, useEffect } from 'react'
import './FirstSection.css'
import imageWater from '@/assets/water.png'
import data from './data'
import Modal from '../Modal/Modal'


const FirstSection = ({label, recipeData}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Store selected recipe
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  const openModal = (recipes) => {
    setSelectedRecipe(recipes); // Set the selected recipe
    setIsModalOpen(true); // Open the modal

  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRecipe(null); // Clear the selected recipe
  };

//   useEffect(() => {
//     const fetchRecipes = async () => {
//         try {
//           const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=da50b756ad814ea7bcfd8c0d06fafc8c&number=10&tags=quinoa'); // Fetching 10 random recipes
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           const data = await response.json();
//           setRecipe(data.recipes);
//           console.log(data.recipes)
//         } catch (error) {
//           setError(error.message);
//         }
//       };
  
//       fetchRecipes();
//   }, []);

    
  

  return (
    <div className='firstSection'>
      <div className='sectionName'>
        <h1>{label}</h1>
      </div>
        {/*  */}
        <div>
            {error && <p>Error: {error}</p>}

            <div className="grids" >
                {recipeData && recipeData.length > 0 ? (
                    recipeData.map((recipe) => (
                    <div key={recipe.id}  onClick={() => openModal(recipe)} className='recipe-card' style={{ marginBottom: '20px' }}>
                        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: 'auto' }} />
                        <h3>{recipe.title}</h3>
                    </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

            </div>

            {/* Render Modal with selected recipe details */}
        <Modal isOpen={isModalOpen} recipes={selectedRecipe} onClose={closeModal} />
        </div>
        
    </div>
  )
}

export default FirstSection