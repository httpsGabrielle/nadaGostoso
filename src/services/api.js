import axios from "axios";

const baseUrl = 'https://nadagostoso-api.onrender.com/api'

export const getRecipes = async () => {
  const response = await axios.get(`${baseUrl}/recipes`)
  return response.data
}