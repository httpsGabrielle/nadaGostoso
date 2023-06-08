import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { editRecipe } from "../services/api";

import { colors, utilities, typography } from "../themes"
import { AuthContext } from "../contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";

const EditRecipe = ({ route }) => {
  const { id, name, ingredients, image_base64, instructions, author } = route.params
  
  const [recipeName, setRecipeName] = useState(name);
  const [tutorialRecipe, setTutorialRecipe] = useState(instructions);
  const [ingredientList, setIngredientList] = useState(ingredients);
  console.log(ingredients)
  const [ingredientName, setIngredientName] = useState();
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState(null);
  const [image, setImage] = useState(image_base64)

  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  const measurements = {
    un: 'Unidade',
    xic: 'Xícara',
    col: 'Colher',
    ml: 'Mililitro',
    lt: 'Litro',
    gr: 'Grama'
  }

  const handleIngredientSubmit = () => {
    if (ingredientName && ingredientQuantity && ingredientUnit) {
      const newIngredient = {
        name: ingredientName,
        quantity: Number(ingredientQuantity),
        measurement: ingredientUnit,
      };
      
      setIngredients([...ingredientList, newIngredient]);
      setIngredientName("");
      setIngredientQuantity("");
      setIngredientUnit(null);
    }
  };

  const handleNewRecipe = async () => {
    const recipeData = {
      name: recipeName,
      ingredients: ingredientList,
      image_base64: image,
      instructions: tutorialRecipe,
    };

    try {
      const response = await editRecipe(recipeData, user.token, id);
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
      {ingredientList.map((ingredientes)=>(
        <View style={styles.inputgroup}>
          <TextInput
            placeholder="Nome"
            onChangeText={setIngredientName}
            value={ingredientes.name}
          />
          <TextInput
            placeholder="Quantidade"
            onChangeText={setIngredientQuantity}
            value={ingredientes.quantity}
            inputMode="numeric"
          />
          <Text>Unidade de medida:</Text>
          <Picker
            mode="dropdown"
            prompt="Unidade de medida"
            selectedValue={ingredientes.measurement}
            onValueChange={(value) => setIngredientUnit(value)}
          >
            {Object.keys(measurements).map(unit => (
              <Picker.Item key={unit} label={measurements[unit]} value={unit} />
            ))}
          </Picker>
        </View>
      ))}
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
        onPress={handleNewRecipe}
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
  inputgroup:{
    flex: 1,
    flexDirection: 'column',
  }
});