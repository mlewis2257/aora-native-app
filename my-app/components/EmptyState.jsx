import { View, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-center text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-white">{subtitle}</Text>
      <CustomButton
        title="Create a Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full mt-4"
      />
    </View>
  );
};

export default EmptyState;
