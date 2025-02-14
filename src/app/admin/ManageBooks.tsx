import React, { useState, useEffect } from "react";

import { useSupBook } from "@/src/hooks/useSupBook";
import { Database } from "@/src/constants/supabase";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

// type Book = {
//   id: string;
//   title: string;
//   author: string;
//   borrowCount: number;
// };

const ManageBooks = () => {
  const router = useRouter();

  const { books, loadBooks, isLoading, error, deleteBookService } =
    useSupBook();

  type Book = Database["public"]["Tables"]["books"]["Row"];
  useEffect(() => {
    loadBooks();
  }, []);

  // Redirection vers la page d'édition du livre
  const handleEdit = (book: Book) => {
    router.push({
      pathname: "/admin/EditBook",
      params: { book: JSON.stringify(book) }, // Serialize the book object to a JSON string
    });
  };

  const handleDelete = (bookId: string) => {
    Alert.alert(
      "Supprimer le livre",
      "Êtes-vous sûr de vouloir supprimer ce livre ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            await deleteBookService(bookId);
            Alert.alert("Livre supprimé avec succès");
            loadBooks();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginBottom: 16,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 14, color: "#555", marginTop: 8 }}>
        Auteur: {item.author}
      </Text>
      <Text style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
        Emprunts: {}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#4A90E2",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
          onPress={() => handleEdit(item)} // Appel de la fonction de redirection pour l'édition
        >
          <Text style={{ color: "white", fontWeight: "500" }}>Modifier</Text>
          {/* Bouton pour modifier */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#E94F47",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>Supprimer</Text>
          {/* Bouton pour supprimer */}
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 16, color: "#333" }}>
          Chargement des livres...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3", padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#333",
          marginBottom: 16,
        }}
      >
        Manage Books
      </Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default ManageBooks;
