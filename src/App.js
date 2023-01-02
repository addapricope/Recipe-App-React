import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./Recipe";
function App() {
// const APP_ID = 'a2d3cb5b';
// const APP_KEY = 'ab57d306c3744a42ec782973de69b32f';
// const exampleReq = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=a2d3cb5b&app_key=ab57d306c3744a42ec782973de69b32f'

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken')

useEffect (() =>{
getRecipes();
}, [query])

const getRecipes = async () => {
  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a2d3cb5b&app_key=ab57d306c3744a42ec782973de69b32f`
  );
  const data = await response.json();
  setRecipes(data.hits);
}

const updateSearch = e =>{
  setSearch(e.target.value);
}

const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className="App">
    <h1 className="logo">Chef's Kitchen</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Any ingredient..." value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
    </div>
  );
}

export default App;
