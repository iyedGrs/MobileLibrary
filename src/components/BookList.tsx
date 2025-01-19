import React from "react";
import { View, Text, Image, FlatList } from "react-native";

type BookVolumeInfo = {
  title: string;
  authors?: string[];
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
  };
};

type Book = {
  id: string;
  volumeInfo: BookVolumeInfo;
};

type Props = {
  currentItems: Book[];
};

const BookList: React.FC<Props> = ({ currentItems }) => {
  return (
    <FlatList
      data={currentItems}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const thumbnailUrl = item.volumeInfo.imageLinks?.thumbnail?.replace(
          "http:",
          "https:"
        );

        return (
          <View className="flex-row mb-4 bg-white rounded-lg shadow-md p-3">
            {/* Book Thumbnail */}
            <View className="w-24 h-32 mr-3">
              <Image
                source={{ uri: thumbnailUrl }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
                onError={(e) =>
                  console.error("Image Load Error:", e.nativeEvent.error)
                }
              />
            </View>

            {/* Book Details */}
            <View className="flex-1 ml-4">
              <Text className="text-lg font-bold text-gray-800">
                {item.volumeInfo?.title || "No Title Available"}
              </Text>

              {item.volumeInfo?.authors && (
                <Text className="text-sm text-gray-600 mt-1">
                  {item.volumeInfo.authors.join(", ")}
                </Text>
              )}

              {item.volumeInfo?.publishedDate && (
                <Text className="text-xs text-gray-500 mt-2">
                  Published: {item.volumeInfo.publishedDate}
                </Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
};

export default BookList;
