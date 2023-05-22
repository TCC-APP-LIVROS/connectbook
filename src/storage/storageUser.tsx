import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storageConfig";
import { UserDTO } from "@dtos/UserDTO";

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const data = storage ? JSON.parse(storage) : null;
  return data;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
