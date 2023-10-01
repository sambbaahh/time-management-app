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
    marginVertical: 2.5,
  },
  typography: {
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 22,
    fontFamily: "Times New Roman",
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
