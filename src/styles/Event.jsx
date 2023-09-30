import {StyleSheet} from "react-native";

const eventStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: "5%",
  },
  card: {
    marginTop: "5%",
    marginBottom: "2.5%",
    paddingHorizontal: "3%",
    paddingVertical: "5%",
  },
  textInput: {
    marginVertical: 8,
  },
  textField: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 17,
  },
  divider: {
    marginVertical: 10,
  },
  primaryButton: {
    marginTop: "4%",
    marginHorizontal: "2.5%",
  },
  datePickerBox: {
    flexDirection: "row",
    flexWrap: "no-wrap",
  },
  categoryBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 12,
    marginBottom: 12,
  },
});

export default eventStyles;
