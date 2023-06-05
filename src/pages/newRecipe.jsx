import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRecipes } from '../services/api';
import Header from '../components/Header';

export default function Recipes() {
    const navigation = useNavigation()
    const {recipeList, setRecipeList} = useState([])
    const {recipeName, setRecipeName} = useState('')

    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const recipes = await getRecipes()
            setRecipeList(recipes)
          } catch (error) {
            console.log(error)
          }
          setLoading(false)
        }
    
        fetchRecipes()
      }, [])

    return (
        <View style={styles.body}>
            <Header/>
            <View style={styles.container}>
                <Text>Nome da Receita</Text>
                <TextInput
                    onChangeText={setRecipeName}
                    value={recipeName}
                    style={styles.textInput}/>
                <Text>Ingredientes</Text>
                <View style={styles.inputgroup}>
                    <TextInput
                    onChangeText={setRecipeName}
                    value={recipeName}
                    style={styles.textInputfirst}/>
                    <TextInput
                    onChangeText={setRecipeName}
                    value={recipeName}
                    style={styles.textInputsecond}/>
                    <TextInput
                    onChangeText={setRecipeName}
                    value={recipeName}
                    style={styles.textInputthrid}/>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Recipes')}>
                    <Text style={styles.btntext}>+ Adicionar Ingredientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Recipes')}>
                    <Text style={styles.btntext}>Postar</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
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
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    inputgroup:{
        flex: 1,
        flexDirection: 'row',
        gap: 16    
    },
    textInputfirst: {
        backgroundColor: '#fbfbfb',
        borderRadius: 4,
        width: '60%',
        height: 32,
        padding: 4,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    textInputsecond: {
        backgroundColor: '#fbfbfb',
        borderRadius: 4,
        width: '10%',
        height: 32,
        padding: 4,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    textInputthrid: {
        backgroundColor: '#fbfbfb',
        borderRadius: 4,
        width: '20%',
        height: 32,
        padding: 4,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
});