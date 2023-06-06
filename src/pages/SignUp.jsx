import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../contexts/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      await signup({ username, name, password });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.text}>Cadastre-se</Text>
        <TextInput
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Nome de usuário"
        />
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder="Nome"
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Senha"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btntext}>Cadastra-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btntextlight}>Já possui uma conta? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUp

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F0F0F0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  text: {
    textAlign: "center",
    color: "#136788",
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#0099E6",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "100%",
  },
  btntext: {
    textAlign: "center",
    color: "#fff",
  },
});
