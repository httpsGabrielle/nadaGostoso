import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import { editRecipe } from "../services/api";

import IngredientInput from "../components/IngredientInput";
import { colors, utilities, typography } from "../themes"
import { AuthContext } from "../contexts/AuthContext";

const EditRecipe = ({ route }) => {
  const { id, name, ingredients, image_base64, instructions } = route.params
  
  const [recipeName, setRecipeName] = useState(name);
  const [tutorialRecipe, setTutorialRecipe] = useState(instructions);
  const [ingredientList, setIngredientList] = useState(ingredients);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState(null);
  const [image, setImage] = useState(image_base64)

  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  const handleDeleteIngredient = (ingredient) => {
    setIngredientList(current => current.filter(obj => {
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
      
      setIngredientList([...ingredientList, newIngredient]);
      setIngredientName("");
      setIngredientQuantity("");
      setIngredientUnit(null);
    }
  };

  const handleUpdateRecipe = async () => {
    const recipeData = {
      name: recipeName,
      ingredients: ingredientList,
      image_base64: image,
      instructions: tutorialRecipe,
    };

    try {
      const response = await editRecipe(recipeData, user.token, id);
      console.log("Receita atualizada com sucesso:", response);
      navigation.navigate('Recipes')
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error.message);
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
      {ingredientList.map((ingrediente, index)=>(
        <View key={index} style={styles.ingredientCard}>
          <Text>{`\u25CF ${ingrediente.name} - ${ingrediente.quantity} ${ingrediente.measurement}`}</Text>
          <TouchableOpacity
            onPress={() => handleDeleteIngredient(ingrediente)}
          >
            <MaterialIcons name="delete" size={20} color={utilities.danger} />
          </TouchableOpacity>
        </View>
      ))}
      <Text>Novo ingrediente:</Text>
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
      <TouchableOpacity
        style={styles.btn}
        onPress={pickImage}
      >
        <Text style={styles.btntext}>+ Adicionar Imagem</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Modo de fazer</Text>
        <TextInput
          onChangeText={setTutorialRecipe}
          value={tutorialRecipe}
          style={styles.input}
          multiline
        />
      <TouchableOpacity
        style={styles.btn} 
        onPress={handleUpdateRecipe}
      >
        <Text style={styles.btntext}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditRecipe

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