import {useState} from "react";
import {Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View,} from "react-native";
import {Avatar, Button, TextInput} from "react-native-paper";

import createUserWithEmailPassword from "../services/auth/SignUp";
import authStyles from "../styles/Auth";
import {screenRoutes} from "../constants/Routes";

export default function TabOneScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSignUp = async () => {
    try {
      if (password !== verifyPassword) throw Error("Passwords do not match");
      await createUserWithEmailPassword(email, password, name);
      setEmail("");
      setName("");
      setPassword("");
      setVerifyPassword("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={authStyles.container}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: "center"}}
          >
            <Avatar.Icon
              icon={"account"}
              style={authStyles.avatarIcon}
              size={80}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              style={authStyles.textInput}
            ></TextInput>
            <TextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
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
            <TextInput
              label="Verify password"
              value={verifyPassword}
              onChangeText={(text) => setVerifyPassword(text)}
              secureTextEntry
              mode="outlined"
              style={authStyles.textInput}
            ></TextInput>
            <Button
              onPress={() => handleSignUp()}
              mode="contained"
              style={authStyles.primaryButton}
            >
              {" "}
              Sign Up{" "}
            </Button>
            <Button
              onPress={() => navigation.navigate(screenRoutes.SIGN_IN)}
              mode="contained"
              buttonColor="pink"
              style={authStyles.primaryButton}
            >
              Already Registered? Sign In
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
