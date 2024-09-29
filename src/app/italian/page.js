'use client'

import FirstSection from '@/components/content/FirstSection/FirstSection'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [recipe, setRecipe] = useState(null);

    useEffect(() => {
    const fetchRecipes = async () => {
        try {
          const response = await fetch(` https://api.spoonacular.com/recipes/complexSearch?apiKey=da50b756ad814ea7bcfd8c0d06fafc8c&cuisine=Italian`); // Fetching 10 random recipes
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setRecipe(data.recipes);
          console.log(data.recipes)
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchRecipes();
  }, []);

  return (
    <div>
      <FirstSection label='italian' recipeData={recipe}/>
    </div>
  )
}

export default page