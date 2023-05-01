import { SignIn } from "@screens/SignIn";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      { fontsLoaded ? <SignIn />: <Loading/>}
    </NativeBaseProvider>
  );
}
