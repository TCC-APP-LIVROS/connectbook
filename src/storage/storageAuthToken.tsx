import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageAuthTokenSave(token: string, refresh_token: string) {
    const data = JSON.stringify({ token, refresh_token });
    await AsyncStorage.setItem("@marketspace:authToken", data);
}

export async function storageAuthTokenGet(token: string, refresh_token: string) {
    const data = JSON.stringify({ token, refresh_token });
    await AsyncStorage.setItem("@marketspace:authToken", data);
}
