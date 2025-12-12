import React, { useMemo } from "react";
import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "../store/theme"; // ajuste o path conforme a sua estrutura
import { useColors } from "@/constants/colors"; // ajuste se necessário

export default function RootLayout() {
  const { theme } = useThemeStore();
  const colors = useColors();

  // Evita recriar o client a cada render (importantíssimo para cache do React Query)
  const queryClient = useMemo(() => new QueryClient({}), []);

  const barStyle = theme === "light" ? "dark" : "light";
  const barBg = colors.background; // mantém coerente com o tema (Android usa)

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={barStyle} backgroundColor={barBg} translucent={false} />

      <Stack screenOptions={{ headerShown: false, contentStyle: { paddingTop: 0 } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="step/index" />
        <Stack.Screen name="create/index" />
        <Stack.Screen name="nutrition/index" />
      </Stack>
    </QueryClientProvider>
  );
}
