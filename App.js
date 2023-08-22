import {Text, View,StyleSheet} from "react-native";
import GlassMorphism from "./src/GlassMorphism/GlassMorphism";
import Confetti from "./src/Confetti/Confetti";

const App = () => {
  return (
      <View style={styles.container}>
          <Confetti/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})
export default App;
