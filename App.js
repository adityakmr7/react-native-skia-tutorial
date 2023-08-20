import {Text, View} from "react-native";

const App = () => {
  return (
      <View style={styles.container}>
        <Text>React Native Skia Animation</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default App;
