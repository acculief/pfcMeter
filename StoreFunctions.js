import { AsyncStorage } from "react-native";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export { storeData, getData };
