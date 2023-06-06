import { useState, useCallback, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'; 

import { getRecipes } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

import { colors } from "../themes";

import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState()

  const { user } = useContext(AuthContext)
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async (token) => {
        try {
          const recipes = await getRecipes(token)
          setRecipeList(recipes)
        } catch (err) {
          console.log(err)
        }
      }

      fetchRecipes(user.token)
    }, [])
  )

  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList 
          data={recipeList}
          renderItem={({ item }) => (
            <RecipeCard
              key={item.id}
              handlePress={() => navigation.navigate('View', item)}
              name={item.name}
              author={item.author.username}
              image={item.image_base64}
            />
          )}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("addRecipe")}
        >
          <MaterialIcons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Recipes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative'
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    width: 64,
    backgroundColor: colors.primary,
    borderRadius: 100,
    position: 'absolute',
    bottom: 32,
    right: 24
  }
});
