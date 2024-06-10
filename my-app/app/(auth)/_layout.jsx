import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="signUp"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default _layout;
