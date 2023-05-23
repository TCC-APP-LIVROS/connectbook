import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export async function storageAuthTokenSave(token: string, refresh_token: string) {
    const data = JSON.stringify({ token, refresh_token });
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, data);
}

export async function storageAuthTokenGet() {
    const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    const data = storage ? JSON.parse(storage) : {};
    return data;
}

export async function storageAuthTokenRemove() {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
  }