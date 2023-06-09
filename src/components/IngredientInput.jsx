import {
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import { Picker } from '@react-native-picker/picker'

import { colors } from "../themes";

const IngredientInput = ({ name, handleName, quantity, handleQuantity, unit, handleUnit}) => {
  const measurements = {
    un: 'Unidade',
    xic: 'Xícara',
    col: 'Colher',
    ml: 'Mililitro',
    lt: 'Litro',
    gr: 'Grama'
  }

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={handleName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        onChangeText={handleQuantity}
        value={quantity}
        inputMode="numeric"
      />
      <Text>Unidade de medida:</Text>
      <Picker
        style={styles.input}
        mode="dropdown"
        prompt="Unidade de medida"
        selectedValue={unit}
        onValueChange={(value) => handleUnit(value)}
      >
        {Object.keys(measurements).map((unit) => (
          <Picker.Item key={unit} label={measurements[unit]} value={unit} />
        ))}
      </Picker>
    </>
  );
};

export default IngredientInput;

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: '100%'
  },
});