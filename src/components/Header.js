import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomComponent = ({ icon }) => {
    const navigation = useNavigation()
  if (icon === 'arrow') {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Recipes')}>
                <Image style={styles.icons} source={require('../../assets/arrow.png')}/>
            </TouchableOpacity>
        </View>
    );
  }else{
        <View style={styles.container}>
            <Image style={styles.icons} source={require('../../assets/settings.jpg')}/>
        </View>
  }

  return null;
};

export default CustomComponent;

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