import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Button, Divider, Text, TextInput } from "react-native-paper";

import signInWithPassword from "../services/auth/SignIn";
import authStyles from "../styles/Auth";
import { screenRoutes } from "../constants/Routes";
import { mainThemeColors } from "../components/Themes";

export default function SignIn({ navigation }) {
  const colors = mainThemeColors;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={authStyles.container}>
        <KeyboardAvoidingView behavior="position">
          <Avatar.Icon icon="login" style={authStyles.avatarIcon} />
          <Text style={authStyles.typography}> Time Management App</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={authStyles.textInput}
          ></TextInput>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            mode="outlined"
            style={authStyles.textInput}
          ></TextInput>
          <Button
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate(screenRoutes.FORGOT_PASSWORD)}
          >
            Forgot password?
          </Button>
          <Button
            onPress={() => handleSignIn()}
            mode="contained"
            style={authStyles.primaryButton}
          >
            {" "}
            Sign In{" "}
          </Button>
          <Divider style={authStyles.primaryButton} />
          <Button
            onPress={() => navigation.navigate(screenRoutes.SIGN_UP)}
            buttonColor={colors.secondary}
            mode="contained"
            style={authStyles.primaryButton}
          >
            New User? Sign Up
          </Button>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
