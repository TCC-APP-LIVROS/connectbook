import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storageConfig";
import { UserDTO } from "@dtos/UserDTO";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  await AsyncStorage.getItem(USER_STORAGE);
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
