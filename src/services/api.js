import axios from "axios";

const baseUrl = 'https://nadagostoso-api.onrender.com/api'

export const getRecipes = async () => {
  const response = await axios.get(`${baseUrl}/recipes`)
  return response.data
}

export const addRecipe = async (recipe) => {
    const response = await axios.post(`${baseUrl}/recipes`, recipe)
    return response.data
}