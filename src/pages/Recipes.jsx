import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { getRecipes } from "../services/api";
import Header from "../components/Header";

export default function Recipes() {
  const [recipeList, setRecipeList] = useState([]);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchRecipes = async () => {
        const token = await SecureStore.getItemAsync('nada_gostoso_token')

        try {
          const recipes = await getRecipes(token)
          setRecipeList(recipes)
        } catch (err) {
          console.log(err)
        }
      }

      fetchRecipes()
    }, [])
  )

  return (
    <View style={styles.body}>
      <Header />
      <View style={styles.container}>
        {recipeList?.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.containerfood}
            onPress={() => navigation.navigate("View", recipe)}
          >
            <Image
              style={styles.img}
              source={{ uri: 'data:image/jpeg;base64,' + recipe.image_base64 }}
            />
            <View>
              <Text style={styles.title}>{recipe.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("addRecipe")}
        >
          <Image
            style={styles.icons}
            source={require("../../assets/plus.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  btn: {
    position: "absolute",
    backgroundColor: "#136788",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 100,
    right: 30,
    bottom: 50,
  },
  icons: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 16,
  },
  containerfood: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    padding: 16,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#136788",
  },
});
