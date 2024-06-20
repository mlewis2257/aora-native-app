import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import React from "react";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4 justify-between">
      <TextInput
        className="text-base mt-0.5 text-white font-pregular text-white"
        value={query}
        placeholder="Search for Video Topics..."
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => {
          setQuery(e);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please enter a query");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
