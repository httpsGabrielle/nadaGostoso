import axios from "axios";

const baseUrl = "https://nadagostoso-api.onrender.com/api";

export const getRecipes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${baseUrl}/recipes`, config);

  return response.data;
};

export const addRecipe = async (recipe, token) => {
  console.log(recipe)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${baseUrl}/recipes`, recipe, config);

  console.log(response)

  return response.data;
};

export const signupApi = async ({ username, name, password }) => {
  const response = await axios.post(`${baseUrl}/users`, {
    username,
    name,
    password,
  });
  return response.data;
};

export const login = async ({ username, password }) => {
  const response = await axios.post(`${baseUrl}/login`, { username, password });
  return response.data;
};
