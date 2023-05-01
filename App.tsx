import { SignIn } from "@screens/SignIn";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { Loading } from "@components/Loading";
import { theme } from './src/theme'
export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });


  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      { fontsLoaded ? <SignIn />: <Loading/>}
    </NativeBaseProvider>
  );
}
