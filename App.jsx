import { useState } from 'react'

import './App.css'

function App() {
  const [search, setSearch]= useState("");
  const [meal, setMeal]= useState([]);

  const handleSearch = async() =>{
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    const data= await response.json();
    if(data.meals){
      setMeal(data.meals);
    }
    else{
      setMeal([]);
      alert("Meal not found");
    }
  };

  return (
    <div>
      <h2>Meal Search</h2>
      <input type="text" placeholder="Search by first letter" maxLength="1" value={search} onChange={(e)=> setSearch(e.target.value)} />
      <button onClick={handleSearch}> search </button>

      {meal.map((meal)=>(
        <div key={meal.idMeal} >
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />

          <p>Catagory: {meal.strCategory}</p>
          <p>Area: {meal.strArea}</p>
          <p>Instruction: {meal.strInstruction}</p>
        </div>
      ))}
    </div>
  );

  
}

export default App


















/*
import { useState } from 'react'

import './App.css'

function App() {
  const [search, setSearch]= useState("");
  const [meal, setMeal]= useState(null);

  const handleSearch = async() =>{
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data= await response.json();
    if(data.meals){
      setMeal(data.meals[0]);
    }
    else{
      setMeal(null);
      alert("Meal not found");
    }
  };

  return (
    <div>
      <h2>Meal Search</h2>
      <input type="text" placeholder="Search by meal name" value={search} onChange={(e)=> setSearch(e.target.value)} />
      <button onClick={handleSearch}> search </button>

      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />

          <p>Catagory: {meal.strCategory}</p>
          <p>Area: {meal.strArea}</p>
          <p>Instruction: {meal.strInstructions}</p>
        </div>
      )}
    </div>
  );

  
}

export default App
*/