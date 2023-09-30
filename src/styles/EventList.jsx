import { StyleSheet } from "react-native";

const eventListStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: "5%",
    marginVertical:15,
  },
  dateView:{
    marginVertical:10,
  },
  firstTextField: {
    fontSize:16,
  },
  textField:{
    marginTop:25,
    fontSize:16
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  textInput:{
    width:"90%",
    marginBottom:10,
  },
  primaryButton: {
    marginTop: "4%",
    marginHorizontal:"2.5%"

  },
  eventCard: {
    marginTop: 10
  },
  dateText: {
    marginTop:30
  },
});

export default eventListStyles;
