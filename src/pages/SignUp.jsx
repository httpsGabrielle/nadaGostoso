import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../themes";
import { AuthContext } from "../contexts/AuthContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      setLoading(true)
      await signup({ username, name, password });
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  };

  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(username) => setUsername(username)}
          placeholder="Nome de usuário"
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Senha"
          secureTextEntry
        />
        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          {loading
            ? <ActivityIndicator />
            : <Text style={styles.btntext}>Cadastrar</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.btntextlight}>
            Já possui uma conta? Login
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default SignUp

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
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
    color: colors.primary,
  },
  btntextlight: {
    color: "#fff",
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    width: '100%'
  }
});
