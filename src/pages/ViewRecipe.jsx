import { useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { deleteRecipe } from '../services/api';

import { colors, utilities, typography } from "../themes"
import { AuthContext } from "../contexts/AuthContext";

const ViewRecipe = ({ route }) => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const { id, name, ingredients, image_base64, instructions, author } = route.params

  const deleteAlert = () => {
    Alert.alert('Deseja excluir a receita?', 'Essa ação não poderá ser desfeita.', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Deleção cancelada.')
      },
      {
        text: 'Excluir',
        onPress: () => handleDelete(id, user.token)
      }
    ])
  }

  const handleDelete = async (id, token) => {
    await deleteRecipe(id, token)
    navigation.navigate('Recipes')
  }

  return (
    <View style={styles.body}>
      <Image
        style={styles.header}
        source={{
          uri: 'data:image/jpeg;base64,' + image_base64,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.h1}>{name}</Text>
        <Text style={styles.h2}>Ingredientes</Text>
        <FlatList
          data={ingredients}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.text}>{`\u25CF ${item.name} - ${item.quantity} ${item.measurement}`}</Text>
              </View>
            );
          }}
        />
        <Text style={styles.h2}>Modo de preparo</Text>
        <Text style={styles.text}>{instructions}</Text>
        {user.id === author.id &&
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.btn}
            >
              <MaterialIcons name="edit" size={32} color={utilities.warning} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteAlert}
              style={styles.btn}
            >
              <MaterialIcons name="delete" size={32} color={utilities.danger} />
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  );
};

export default ViewRecipe

const styles = StyleSheet.create({
  body: {
    width: "100%",
  },
  container: {
    padding: 16,
  },
  header: {
    width: "100%",
    height: 260,
    backgroundColor: "black",
  },
  h1: {
    color: colors.primary,
    fontSize: typography.title.size,
    fontWeight: typography.title.weight,
    marginBottom: 16
  },
  h2: {
    color: colors.secondary,
    fontSize: typography.subTitle.size,
    fontWeight: typography.subTitle.weight,
    marginBottom: 8
  },
  text: {
    fontSize: typography.regular.size,
    fontWeight: typography.regular.weight,
    textAlign: "justify",
  },
  options: {
    marginTop: 32,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  btn: {
    padding: 8,
    marginLeft: 16
  }
});