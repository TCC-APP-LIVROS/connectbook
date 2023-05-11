import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";

import { theme } from './src/theme'

import "./src/i18n"
import "react-native-gesture-handler"

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });


  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      { fontsLoaded ? <Routes />: <Loading/>}
    </NativeBaseProvider>
  );
}
