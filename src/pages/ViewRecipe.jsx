import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const ViewRecipe = (props) => {
    const navigation = useNavigation()  
    const {name, ingredients, tutorial} = props
    
    return (
        <View style={styles.body}>
            <Header icon='arrow'/>
            <Image style={styles.header} source={{ uri: 'data:image/jpeg;base64,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' }}/>
            <View style={styles.container}>
                <Text style={styles.h1}>{name}</Text>
                <Text style={styles.h2}>Ingredientes</Text>
                <FlatList
                    data={ingredients}
                    renderItem={({ item }) => {
                        return (
                        <View style={{ marginBottom: 6 }}>
                            <Text style={{ fontSize: 12 }}>{`\u25CF ${item.key}`}</Text>
                        </View>
                        );
                    }}
                />
                <Text style={styles.h2}>Modo de preparo</Text>
                <Text style={styles.text}>{tutorial}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
    },
    container:{
        padding: 16
    },
    header:{
        width: '100%',
        height: 260,
        backgroundColor: 'black'
    },
    h1:{
        color: '#136788',
        fontSize: 24,
        fontWeight: 'bold'
    },
    h2:{
        color: '#0099E6',
        fontSize: 16,
        fontWeight: 'bold'
    },
    text:{
        textAlign: 'justify'
    }
});

export default ViewRecipe;
