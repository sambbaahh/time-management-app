import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import authStyles from "../styles/Auth";
import { useState } from "react";
import resetPassword from "../services/auth/ResetPassword";
import { screenRoutes } from "../constants/Routes";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await resetPassword(email);
      alert(response);
      navigation.navigate(screenRoutes.SIGN_IN);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={authStyles.container}>
        <Avatar.Icon
          icon="lock-alert"
          style={authStyles.avatarIcon}
          size={80}
        />
        <KeyboardAvoidingView behavior="position">
          <Text style={authStyles.description}>
            Please enter the email address you'd like your password reset
            information sent to
          </Text>
          <TextInput
            mode="outlined"
            label="Email"
            style={authStyles.textInput}
            onChangeText={(text) => setEmail(text)}
          />
          <Button
            style={authStyles.primaryButton}
            mode="contained"
            onPress={handleResetPassword}
          >
            Reset Password
          </Button>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
