import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors, utilities } from "../themes"

const RecipeCard = ({ name, image, author, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        style={styles.img}
        source={{ uri: 'data:image/jpeg;base64,' + image }}
      />
      <View>
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.author}>@{author}</Text>
        </View>

        <View>
          <MaterialIcons name="edit" size={16} color={colors.warning} />
          <MaterialIcons name="delete" size={16} color={utilities.danger} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RecipeCard

const styles = StyleSheet.create({
  container: {
    height: 96,
    width: '100%',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 6,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
  author: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'black',
    opacity: 0.5,
    marginTop: 8
  }
})