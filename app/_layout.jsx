import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { loadUserProfile } from "../src/utils/storage";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const router = useRouter();

  // On launch, check AsyncStorage for an existing profile.
  useEffect(() => {
    loadUserProfile().then((profile) => {
      setHasProfile(!!profile);
      setReady(true);
    });
  }, []);

  // No profile → send the user through onboarding first.
  useEffect(() => {
    if (ready && !hasProfile) {
      router.replace("/onboarding");
    }
  }, [ready, hasProfile]);

  // Hold the (blank) splash until we know which way to route.
  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
