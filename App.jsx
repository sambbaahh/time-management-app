import {NavigationContainer} from "@react-navigation/native";
import {PaperProvider} from "react-native-paper";
import {Main} from "./src/Main";
import {mainThemeColors} from "./src/components/Themes";

export default function App() {
  const theme = {
    colors: mainThemeColors
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}
