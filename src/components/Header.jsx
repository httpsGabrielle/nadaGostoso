import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AuthContext } from "../contexts/AuthContext";
import { colors } from "../themes";
import { MaterialIcons } from '@expo/vector-icons'

const Header = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { logout } = useContext(AuthContext)
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: "100%",
      backgroundColor: colors.secondary,
      paddingHorizontal: 16,
      paddingTop: insets.top + 4,
      paddingBottom: 16
    }
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={logout}
      >
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
      {(route.name !== 'Recipes') && 
        <TouchableOpacity
          onPress={() => navigation.navigate('Recipes')}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      }
    </View>
  )
};

export default Header;

