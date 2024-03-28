import './App.css'
import HomePage from './components/homePage';
import Header from './components/header';
import AddRecipes from "./components/recipes/addRecipes"
import { Routes,Route, useNavigate } from "react-router-dom"
import Login from "./components/user/login"
import Sighin from "./components/user/sighin"
import ViewRecipes from "./components/recipes/viewRecipes"
import Categories from "./components/categories/categories"
import { useEffect } from 'react';
import getCategory from "./services/server/getCategoriesServer"
import getRecipes from "./services/server/getRecipesServer"
import { useDispatch } from 'react-redux';
import MyRecipes from './components/recipes/myRecipes';
import { useSelector } from 'react-redux';
import RecipeDetailes from './components/recipes/recipeDetailes';
import ViewList from './components/shoppingList/viewList';
function App() {
  const navig = useNavigate();
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getRecipes())
    dispatch(getCategory())
  },[])

  useEffect(()=>{
    if (user)
    navig("/homePage");
  else  navig("/");
  },[user])
  return (
    <div className='App'>
    <Header/>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sighin" element={<Sighin/>}/>
      <Route path="/recipes" element={<ViewRecipes/>}/>
      <Route path="/homePage" element={<HomePage/>}/>
      <Route path="/addRecipes" element={<AddRecipes/>}/>
      <Route path="/editRecipes" element={<AddRecipes/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/myRecipes" element={<MyRecipes/>}/>
      <Route path="/recipeDetailes" element={<RecipeDetailes/>}/>
      <Route path="/shoppingList" element={<ViewList/>}/>
    </Routes>
    </div>
  );
}
export default App;
