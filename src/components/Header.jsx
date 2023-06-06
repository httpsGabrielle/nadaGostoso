import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";
import { colors, typography } from "../themes";
import { MaterialIcons } from '@expo/vector-icons'

const Header = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { logout } = useContext(AuthContext)

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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    backgroundColor: colors.secondary,
    padding: 20,
  },
  name: {
    color: '#fff',
    fontSize: typography.subTitle.size,
    fontWeight: typography.subTitle.weight
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    padding: 8
  },
});
