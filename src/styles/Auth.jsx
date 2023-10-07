import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: "5%",
    height: "100%",
  },
  textInput: {
    marginTop: 5,
    marginVertical: 2.5,
  },
  typography: {
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 22,
  },
  description: {
    marginBottom: 10,
    fontSize: 15,
  },
  avatarIcon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  primaryButton: {
    marginTop: 12,
    marginHorizontal: "2.5%",
  },
});

export default authStyles;
