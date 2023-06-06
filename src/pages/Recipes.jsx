import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRecipes } from '../services/api';
import Header from '../components/Header';

export default function Recipes() {
    const navigation = useNavigation()
    const {recipeList, setRecipeList} = useState([])

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
                {recipeList?.map((recipe, index) => (
                    <TouchableOpacity style={styles.containerfood} onPress={()=>navigation.navigate('View', item)}>
                        <Image style={styles.img} source={require('../../assets/food.jpg')}/>
                        <View>
                            <Text style={styles.title}>{recipe.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('View', teste)}>
                    <Image style={styles.icons} source={require('../../assets/plus.png')}/>
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
        flex: 1
    }, 
    btn:{
        position: 'absolute',
        backgroundColor: '#136788',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        right: 30,
        bottom: 50,
    },
    icons:{
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    img:{
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 16
    },
    containerfood:{
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        width: '100%',
        padding: 16,
        flex: 1,
        flexDirection: 'row'
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#136788'
    }
});