import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import { addRecipe } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { colors, typography } from "../themes";
import IngredientInput from "../components/IngredientInput";

const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [tutorialRecipe, setTutorialRecipe] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState(null);
  const [image, setImage] = useState(null)

  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  const handleDeleteIngredient = (ingredient) => {
    setIngredients(current => current.filter(obj => {
       if (obj.name === ingredient.name && obj.quantity === ingredient.quantity && obj.measurement === ingredient.measurement) {
        return false
       } else return true
    }))
  }

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
      setIngredientUnit(null);
    }
  };

  const handleNewRecipe = async () => {
    const recipeData = {
      name: recipeName,
      ingredients: ingredients,
      image_base64: image,
      instructions: tutorialRecipe,
    };

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
    <View style={styles.container}>
      <Text style={styles.title}>Nome da Receita</Text>
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
        <View key={index} style={styles.ingredientCard}>
        <Text>{`\u25CF ${ingredient.name} - ${ingredient.quantity} ${ingredient.measurement}`}</Text>
        <TouchableOpacity
          onPress={() => handleDeleteIngredient(ingredient)}
        >
          <MaterialIcons name="delete" size={20} color={utilities.danger} />
        </TouchableOpacity>
      </View>
      ))}
      <IngredientInput 
        name={ingredientName}
        handleName={setIngredientName}
        quantity={ingredientQuantity}
        handleQuantity={setIngredientQuantity}
        unit={ingredientUnit}
        handleUnit={setIngredientUnit}
      />
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
        style={styles.input}
        multiline
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={pickImage}
      >
        <Text style={styles.btntext}>+ Adicionar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn} 
        onPress={handleNewRecipe}
      >
        <Text style={styles.btntext}>Postar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default NewRecipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16
  },
  title: {
    fontSize: typography.title.size,
    fontWeight: typography.title.weight,
    color: colors.primary,
    marginBottom: 8
  },
  subtitle: {
    fontSize: typography.subTitle.size,
    fontWeight: typography.subTitle.weight,
    color: colors.primary,
    marginBottom: 8
  },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  btntext: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: '100%'
  },
  ingredientCard:{
    width: '100%',
    padding: 8,
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
