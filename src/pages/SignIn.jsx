import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../contexts/authContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const { signin, authenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const user = await signin({ username, password });
      
      if (user) {
        navigation.navigate("Recipes");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <LinearGradient colors={["#136788", "#259DCC"]} style={styles.body}>
        <View style={styles.container}>
          <Image style={styles.img} source={require("../../assets/logo.png")} />
          <TextInput
            value={username}
            onChangeText={(username) => setUsername(username)}
            placeholder="Nome de usuário"
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.btntextlight}>
              Não possui uma conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 34,
  },
  btn: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "100%",
  },
  btntext: {
    textAlign: "center",
    color: "#136788",
  },
  btntextlight: {
    color: "#fff",
  },
});
