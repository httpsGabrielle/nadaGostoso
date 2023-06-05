import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-web';

export default function SignIn() {
    const navigation = useNavigation()

    return (
        <View>
            <LinearGradient
                colors={['#136788', '#259DCC']}
                style={styles.body}
            >       
                <View style={styles.container}>
                    <Image style={styles.img} source={require('../../assets/logo.png')}/>
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Recipes')}>
                        <Text style={styles.btntext}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('NewRecipe')}>
                        <Text style={styles.btntextlight}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </View>    
            </LinearGradient>
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
    btn: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
        
    },
    btntext:{
        textAlign: 'center',
        color: '#136788',
    },
    btntextlight:{
        color:'#fff'
    }
});