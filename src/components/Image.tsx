import React from "react";
import { Image as RNImage, ImageProps, View, Text } from "react-native";

export const Image = (props: ImageProps) => {
  return(
    <View className="flex-row items-center" >
        <Text>
            hey there
        </Text>
        <RNImage {...props} className="border border-gray-200 h-28 w-10 p-6"   source={{uri:'http://books.google.com/books/content?id=--1VjFJg7WgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' }} />
    </View>
  );
}; 
