import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addRecipe } from '../services/api';
import Header from '../components/Header';

export default function Recipes() {
    const navigation = useNavigation()
    const {recipeList, setRecipeList} = useState([])
    const {recipeName, setRecipeName} = useState('')
    const {tutorialRecipe, setTutorialRecipe} = useState('')
    const [ingredients, setIngredients] = useState([]);
    const [ingredientType, setIngredientType] = useState('');
    const [ingredientQuantity, setIngredientQuantity] = useState('');
    const [ingredientUnit, setIngredientUnit] = useState('');
  
    const handleIngredientSubmit = () => {
      if (ingredientType !== '' && ingredientQuantity !== '' && ingredientUnit !== '') {
        const newIngredient = {
          type: ingredientType,
          quantity: ingredientQuantity,
          unit: ingredientUnit
        };
        setIngredients([...ingredients, newIngredient]);
        setIngredientType('');
        setIngredientQuantity('');
        setIngredientUnit('');
      }
    };

    const handleNewRecipe = async () => {
        const recipeData = {
            name: recipeName,
            ingredients: ingredients,
            instructions: tutorialRecipe,
            author:'gabe'
        };
    
        try {
            const response = await addRecipe(recipeData);
            console.log('Receita adicionada com sucesso:', response);
            // Lógica adicional após a adição bem-sucedida da receita
        } catch (error) {
            console.error('Erro ao adicionar a receita:', error.message);
            // Lógica adicional para tratar o erro
        }
      };

    return (
        <View style={styles.body}>
            <Header/>
            <View style={styles.container}>
                <Text>Nome da Receita</Text>
                <TextInput
                    onChangeText={setRecipeName}
                    value={recipeName}
                    style={styles.input}/>
                <Text style={styles.subtitle}>Ingredientes:</Text>
                {ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredient}>
                    {ingredient.type} - {ingredient.quantity} {ingredient.unit}
                    </Text>
                ))}
                <View style={styles.ingredientContainer}>
                    <TextInput
                    style={styles.inputInline}
                    placeholder="Tipo"
                    onChangeText={(text) => setIngredientType(text)}
                    value={ingredientType}
                    />
                    <TextInput
                    style={styles.inputInline}
                    placeholder="Quantidade"
                    onChangeText={(text) => setIngredientQuantity(text)}
                    value={ingredientQuantity}
                    />
                    <TextInput
                    style={styles.inputInline}
                    placeholder="Unidade"
                    onChangeText={(text) => setIngredientUnit(text)}
                    value={ingredientUnit}
                    />
                </View>    
                <TouchableOpacity style={styles.btn} onPress={handleIngredientSubmit}>
                    <Text style={styles.btntext}>+ Adicionar Ingrediente</Text>
                </TouchableOpacity>       
                <Text>Modo de fazer</Text>
                <TextInput
                    onChangeText={setTutorialRecipe}
                    value={tutorialRecipe}
                    style={styles.textarea}/>
                <TouchableOpacity style={styles.btn} onPress={()=>handleNewRecipe()}>
                    <Text style={styles.btntext}>Postar</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
    },
    container: {
        padding: 34
    },
    btn: {
        backgroundColor: '#136788',
        padding: 10,
        borderRadius: 5,
        margin: 10        
    },
    btntext:{
        textAlign: 'center',
        color: '#fff',
    },
    textInput: {
        backgroundColor: '#fbfbfb',
        borderRadius: 4,
        width: '100%',
        height: 32,
        padding: 4,
        borderColor: '#C0C0C0',
        borderWidth: 1
    },
    inputgroup:{
        flex: 1,
        flexDirection: 'row',
        gap: 16
    },
    textarea:{
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 16,
    },
    ingredientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    ingredient: {
      fontSize: 16,
      marginBottom: 4,
    },
    inputInline: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      marginRight: 8,
      paddingHorizontal: 12,
    },
    addButton: {
      backgroundColor: 'blue',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    submitButton: {
      backgroundColor: 'green',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    }
});