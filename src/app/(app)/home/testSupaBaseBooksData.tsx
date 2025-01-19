import { FlatList, View, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSupBook } from '@/src/hooks/useSupBook';
import { Text } from 'react-native';

const SupaBaseBook = () => {
    const {books} = useSupBook()
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        description: '',
        image_url: '',
        google_books_id: ''
    });

    return (
        <View className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold mb-5 text-center text-gray-800">Books Library</Text>
            <View className="mb-5">
                <TextInput
                    className="border border-gray-600 p-2 mb-2 rounded"
                    placeholder="Title"
                    value={newBook.title}
                    onChangeText={(text) => setNewBook({...newBook, title: text})}
                    placeholderTextColor="#6b7280"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                <TextInput
                    className="border border-gray-600 p-2 mb-2 rounded"
                    placeholder="Author"
                    value={newBook.author}
                    onChangeText={(text) => setNewBook({...newBook, author: text})}
                    placeholderTextColor="#6b7280"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                <TextInput
                    className="border border-gray-600 p-2 mb-2 rounded"
                    placeholder="Description"
                    value={newBook.description}
                    onChangeText={(text) => setNewBook({...newBook, description: text})}
                    placeholderTextColor="#6b7280"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                <TextInput
                    className="border border-gray-600 p-2 mb-2 rounded"
                    placeholder="Image URL"
                    value={newBook.image_url}
                    onChangeText={(text) => setNewBook({...newBook, image_url: text})}
                    placeholderTextColor="#6b7280"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                <TextInput
                    className="border border-gray-600 p-2 mb-2 rounded"
                    placeholder="Google Books ID"
                    value={newBook.google_books_id}
                    onChangeText={(text) => setNewBook({...newBook, google_books_id: text})}
                    placeholderTextColor="#6b7280"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                />
                {/* <Button 
                    title="Add Book" 
                    onPress={insertBook}
                /> */}
            </View>
            {/* 
            <Button 
                title="Fetch Books" 
                onPress={fetchBooks}
            /> */}
            
            <FlatList
                className="mt-5"
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="p-2 border-b border-gray-600">
                        <Text className="text-lg font-bold">{item.title}</Text>
                        <Text className="text-gray-600">By: {item.author}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default SupaBaseBook