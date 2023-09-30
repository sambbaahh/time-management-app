import {ActivityIndicator, Text} from "react-native-paper";
import {View} from "react-native";
import authStyles from "../styles/Auth";

export function LoadingEffect() {
  return (
    <View style={{
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ActivityIndicator animating={true} size="large"> </ActivityIndicator>
      <Text style={{marginTop:15}}> Loading...</Text>
    </View>
  )
}