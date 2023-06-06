import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from "expo-secure-store";

import { addRecipe } from "../services/api";
import Header from "../components/Header";

export default function NewRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [tutorialRecipe, setTutorialRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [image, setImage] = useState(null)

  const navigation = useNavigation();

  const handleIngredientSubmit = () => {
    if (ingredientName && ingredientQuantity && ingredientUnit) {
      const newIngredient = {
        name: ingredientName,
        quantity: Number(ingredientQuantity),
        measurement: ingredientUnit,
      };
      
      setIngredients([...ingredients, newIngredient]);
      setIngredientName("");
      setIngredientQuantity("");
      setIngredientUnit("");
    }
  };

  const handleNewRecipe = async () => {
    const recipeData = {
      name: recipeName,
      ingredients: ingredients,
      image_base64: image,
      instructions: tutorialRecipe,
    };

    const userJson = await SecureStore.getItemAsync("nada_gostoso_token");
    const user = JSON.parse(userJson)

    try {
      const response = await addRecipe(recipeData, user.token);
      console.log("Receita adicionada com sucesso:", response);
      navigation.navigate('Recipes')
    } catch (error) {
      console.error("Erro ao adicionar a receita:", error.message);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!result.canceled) {
      setImage(result.assets[0].base64)
    }
  }

  return (
    <View style={styles.body}>
      <Header />
      <View style={styles.container}>
        <Text>Nome da Receita</Text>
        <TextInput
            style={styles.input}
            placeholder="Nome da receita"
            onChangeText={setRecipeName}
            value={recipeName}
          />
        <Text style={styles.subtitle}>
          Ingredientes:
        </Text>
        {ingredients.map((ingredient, index) => (
          <Text
            key={index} 
            style={styles.ingredient}
          >
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          </Text>
        ))}
        <View style={styles.ingredientContainer}>
          <TextInput
            style={styles.inputInline}
            placeholder="Nome"
            onChangeText={setIngredientName}
            value={ingredientName}
          />
          <TextInput
            style={styles.inputInline}
            placeholder="Quantidade"
            onChangeText={setIngredientQuantity}
            value={ingredientQuantity}
          />
          <TextInput
            style={styles.inputInline}
            placeholder="Unidade"
            onChangeText={setIngredientUnit}
            value={ingredientUnit}
          />
        </View>
        <TouchableOpacity 
          style={styles.btn} 
          onPress={handleIngredientSubmit}
        >
          <Text style={styles.btntext}>+ Adicionar Ingrediente</Text>
        </TouchableOpacity>
        <Text>Modo de fazer</Text>
        <TextInput
          onChangeText={setTutorialRecipe}
          value={tutorialRecipe}
          style={styles.textarea}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={pickImage}
        >
          <Text style={styles.btntext}>Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn} 
          onPress={handleNewRecipe}
        >
          <Text style={styles.btntext}>Postar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
  },
  container: {
    padding: 34,
  },
  btn: {
    backgroundColor: "#136788",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  btntext: {
    textAlign: "center",
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fbfbfb",
    borderRadius: 4,
    width: "100%",
    height: 32,
    padding: 4,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  inputgroup: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  textarea: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 4,
  },
  inputInline: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
