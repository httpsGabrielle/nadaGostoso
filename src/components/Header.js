import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Image style={styles.icons} source={require('../../assets/settings.jpg')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0099E6',
        padding: 20
    }, 
    icons:{
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
});