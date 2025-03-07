import React, { useState, useEffect } from 'react';
import './App.css'
function App() {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                setMeal(data.meals[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, []);

    const getIngredients = (meal) => {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            if (meal[ingredientKey]) {
                ingredients.push(`${meal[ingredientKey]} - ${meal[measureKey]}`);
            }
        }
        return ingredients;
    };

    const handleNewMeal = () => {
        window.location.reload();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="app">
            <h1>Random Meal Generator</h1>
            <button className="new-meal-btn" onClick={handleNewMeal}>Get New Meal</button>
            {meal && (
                <div className="meal-container">
                    <h2>{meal.strMeal}</h2>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <h3>Ingredients:</h3>
                    <ul>
                        {getIngredients(meal).map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Instructions:</h3>
                    <p>{meal.strInstructions}</p>
                </div>
            )}
        </div>
    );
}

export default App;
