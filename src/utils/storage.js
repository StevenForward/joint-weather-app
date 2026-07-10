import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "jointcast_profile";

// Profile shape:
// { location: { name, latitude, longitude }, joints: ['ankle', 'wrist', ...] }

export async function saveUserProfile(profile) {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.warn("Failed to save user profile", err);
  }
}

export async function loadUserProfile() {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn("Failed to load user profile", err);
    return null;
  }
}
