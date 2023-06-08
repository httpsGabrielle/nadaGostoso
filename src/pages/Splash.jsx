import { Image, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient";

import { colors } from '../themes'
import logo from '../../assets/logo.png'

const Splash = () => {
  return (
    <LinearGradient style={styles.container} colors={[colors.primary, colors.secondary]}>
      <Image source={logo} />
    </LinearGradient>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
})
