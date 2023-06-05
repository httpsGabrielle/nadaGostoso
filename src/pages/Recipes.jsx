import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

export default function Recipes() {
    const navigation = useNavigation()

    return (
        <View style={styles.body}>
            <Header/>
            <View style={styles.container}>
                <View>
                    
                </View>
                <TouchableOpacity style={styles.btn}>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 34
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
    }
});