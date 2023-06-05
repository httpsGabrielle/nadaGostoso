import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-web';

export default function SignIn() {
    const navigation = useNavigation()

    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.text}>Cadastra-se</Text>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={styles.btntext}>Cadastra-se</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
                    <Text style={styles.btntextlight}>Já possui uma conta? Cadastre-se</Text>
                </TouchableOpacity>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F0F0F0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    text:{
        textAlign: 'center',
        color: '#136788',
        fontSize: 32,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: '#0099E6',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: '100%',
    },
    btntext:{
        textAlign: 'center',
        color: '#fff',
    },
});