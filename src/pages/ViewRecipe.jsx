import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import Header from "../components/Header";

const ViewRecipe = ({ route }) => {

  const { name, ingredients, image_base64, instructions } = route.params

  return (
    <View style={styles.body}>
      <Header icon="arrow" />
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
                <Text style={{ fontSize: 12 }}>{`\u25CF ${item.name} - ${item.quantity} ${item.measurement}`}</Text>
              </View>
            );
          }}
        />
        <Text style={styles.h2}>Modo de preparo</Text>
        <Text style={styles.text}>{instructions}</Text>
      </View>
    </View>
  );
};

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
    color: "#136788",
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    color: "#0099E6",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    textAlign: "justify",
  },
});

export default ViewRecipe;
