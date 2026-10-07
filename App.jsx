import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState([]);
  const [smeal, setsMeal] = useState(null);

  const handleSearch = async() =>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    const data = await response.json();
    if(data.meals){
      setMeal(data.meals);
    }
    else{
      setMeal([]);
      alert("meal not found");
    }
  }

  const MealDeatils= async(id)=>{
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setsMeal(data.meals[0])
  }

  const getIngredients = (meal)=>{
    const ingredients = [];
    for(let i=1; i<=20; i++){
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if(ingredient)
        ingredients.push(`${ingredient} - ${measure}`);
    }
    return ingredients;
  }

  return (
    <div>
      <h2>Meal Search</h2>
      <input type="text" placeholder="search by first letter" maxLength="1" value={search} onChange={(e)=>setSearch(e.target.value)} />
      <button onClick={handleSearch}> search</button>

      {meal.map((item)=>(
        <div key={item.idMeal}>
          <h2 key={item.idMeal} onClick={()=> MealDeatils(item.idMeal)}> {item.strMeal} </h2>

          {/*<img src={item.strMealThumb} alt="" width="250px" />
          <p>Category: {item.strCategory}</p>
          <p>Area: {item.strArea}</p>
          <p>Instruction: {item.strInstructions}</p>*/}
        </div>
      ))}

      {smeal && (
        <div>
          <h2>{smeal.strMeal}</h2>
          <img src={smeal.strMealThumb} alt="" width="300px"/>
          <p>Category: {smeal.strCategory}</p>
          <p>Area: {smeal.strArea}</p>
          <p>Country: {smeal.strCountry}</p>
          <p>Instruction: {smeal.strInstructions}</p>
          <p>TAg: {smeal.strTags}</p>
          <p>video link: {smeal.strYoutube}</p>
          <p>{getIngredients(smeal)}</p>
          <ol>
            {getIngredients(smeal).map((item, index)=>(
              <li>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )

}

export default App
