'use client'

import SearchModal from './SearchModal';
import './Search.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import Modal from '@/components/Modal'; // Assuming you have a modal component

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query) {
      // Fetch recipes from the Spoonacular API
      const fetchRecipes = async () => {
        try {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=da50b756ad814ea7bcfd8c0d06fafc8c&query=${query}`
          );
          const data = await res.json();

          if (data.results) {
            setRecipeData(data.results);
          } else {
            setError('No recipes found');
          }
        } catch (err) {
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };

      fetchRecipes();
    }
  }, [query]);

  // Fetch detailed recipe information by ID and open modal
  const openModal = async (recipeId) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=da50b756ad814ea7bcfd8c0d06fafc8c`
      );
      const data = await res.json();
      setSelectedRecipe(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  // Handle modal closing
  const closeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      
      <div>
        {error && <p>Error: {error}</p>}

        <div className="grids">
          {recipeData && recipeData.length > 0 ? (
            recipeData.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => openModal(recipe.id)} // Use the recipe ID to fetch detailed information
                className="recipe-card"
                style={{ marginBottom: '20px' }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{recipe.title}</h3>
              </div>
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>

        {/* Render Modal with selected recipe details */}
        <SearchModal isOpen={isModalOpen} recipe={selectedRecipe} onClose={closeModal} />
      </div>
    </div>
  );
}
