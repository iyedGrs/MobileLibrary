
// import React, { useState, useEffect } from "react"
// import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
// import { useRouter } from "expo-router"
// import { supabase } from "@/src/supaBaseClient" 
// import { Feather } from "@expo/vector-icons"

// type Book = {
//   id: string
//   title: string
//   author: string
//   borrow_count: number
// }

// const ManageBooks = () => {
//   const router = useRouter()
//   const [books, setBooks] = useState<Book[]>([])
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)

//   // const fetchBooks = async () => {
//   //   try {
//   //     setIsLoading(true)
//   //     const { data, error } = await supabase.from("books").select("id, title, author, borrow_count").order("title")

//   //     if (error) throw error
//   //     setBooks(data || [])
//   //     setError(null)
//   //   } catch (err) {
//   //     console.error("Error fetching books:", err)
//   //     setError("Failed to load books")
//   //   } finally {
//   //     setIsLoading(false)
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchBooks()
//   // }, [])

//   const handleEdit = (book: Book) => {
//     router.push({
//       pathname: "/admin/EditBook",
//       params: { bookId: book.id },
//     })
//   }

//   const handleDelete = async (bookId: string) => {
//     Alert.alert("Supprimer le livre", "Êtes-vous sûr de vouloir supprimer ce livre ?", [
//       { text: "Annuler", style: "cancel" },
//       {
//         text: "Supprimer",
//         onPress: async () => {
//           try {
//             setIsLoading(true)
//             const { error } = await supabase.from("books").delete().eq("id", bookId)

//             if (error) throw error

//             setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
//             Alert.alert("Succès", "Livre supprimé avec succès")
//           } catch (err) {
//             console.error("Error deleting book:", err)
//             Alert.alert("Erreur", "Échec de la suppression du livre")
//           } finally {
//             setIsLoading(false)
//           }
//         },
//         style: "destructive",
//       },
//     ])
//   }

//   const renderBook = ({ item }: { item: Book }) => (
//     <View className="bg-white rounded-lg shadow-md p-4 mb-4">
//       <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
//       <Text className="text-sm text-gray-600 mt-1">Auteur: {item.author}</Text>
//       <Text className="text-sm text-gray-500 mt-1">Emprunts: {item.borrow_count}</Text>
//       <View className="flex-row justify-between mt-4">
//         <TouchableOpacity
//           className="bg-blue-500 py-2 px-4 rounded-md flex-row items-center"
//           onPress={() => handleEdit(item)}
//         >
//           <Feather name="edit" size={16} color="white" style={{ marginRight: 8 }} />
//           <Text className="text-white font-medium">Modifier</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           className="bg-red-500 py-2 px-4 rounded-md flex-row items-center"
//           onPress={() => handleDelete(item.id)}
//         >
//           <Feather name="trash-2" size={16} color="white" style={{ marginRight: 8 }} />
//           <Text className="text-white font-medium">Supprimer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" color="#3B82F6" />
//         <Text className="mt-4 text-gray-600">Chargement des livres...</Text>
//       </View>
//     )
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <Text className="text-red-500 text-lg">{error}</Text>
//       </View>
//     )
//   }

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-2xl font-bold text-gray-800 mb-6">Gérer les Livres</Text>
//       <FlatList
//         data={books}
//         keyExtractor={(item) => item.id}
//         renderItem={renderBook}
//         contentContainerStyle={{ paddingBottom: 16 }}
//       />
//     </View>
//   )
// }

// export default ManageBooks


import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSupBook } from "@/src/hooks/useSupBook"; // Importez le hook
import { Database
 } from "@/src/constants/supabase";

 type Book = Database["public"]["Tables"]["books"]["Row"];
const ManageBooks = () => {
  const router = useRouter();

  // Utilisez le hook useSupBook pour gérer les livres
  const { books, loadBooks, isLoading, error } = useSupBook();

  // Charge les livres au montage du composant
  useEffect(() => {
    loadBooks();
  }, []);

  // Fonction pour rediriger vers l'écran de modification d'un livre
  const handleEdit = (book: { id: any; }) => {
    router.push({
      pathname: "/admin/EditBook",
      params: { bookId: book.id }, // Passe l'ID du livre à l'écran de modification
    });
  };

  // Fonction pour supprimer un livre
  // const handleDelete = async (bookId: string) => {
  //   Alert.alert("Supprimer le livre", "Êtes-vous sûr de vouloir supprimer ce livre ?", [
  //     { text: "Annuler", style: "cancel" }, // Bouton "Annuler"
  //     {
  //       text: "Supprimer",
  //       onPress: async () => {
  //         try {
  //           await deleteBook(bookId); // Supprime le livre en utilisant la fonction du hook
  //           Alert.alert("Succès", "Livre supprimé avec succès"); // Affiche une alerte de succès
  //         } catch (err) {
  //           console.error("Error deleting book:", err); // Affiche l'erreur dans la console
  //           Alert.alert("Erreur", "Échec de la suppression du livre"); // Affiche une alerte d'erreur
  //         }
  //       },
  //       style: "destructive", // Style du bouton "Supprimer"
  //     },
  //   ]);
  // };

  // Fonction pour afficher chaque livre dans la liste
  const renderBook = ({ item }: { item: Book }) => (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-sm text-gray-600 mt-1">Auteur: {item.author}</Text>
      <Text className="text-sm text-gray-500 mt-1">Emprunts: {}</Text>
      <View className="flex-row justify-between mt-4">
        {/* Bouton "Modifier" */}
        <TouchableOpacity
          className="bg-blue-500 py-2 px-4 rounded-md flex-row items-center"
          onPress={() => handleEdit(item)}
        >
          <Feather name="edit" size={16} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-medium">Modifier</Text>
        </TouchableOpacity>
        {/* Bouton "Supprimer" */}
        {/* <TouchableOpacity
          className="bg-red-500 py-2 px-4 rounded-md flex-row items-center"
          onPress={() => handleDelete(item.id)}
        > */}
          {/* <Feather name="trash-2" size={16} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-medium">Supprimer</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  // Affiche un indicateur de chargement si les livres sont en cours de chargement
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Chargement des livres...</Text>
      </View>
    );
  }

  // Affiche un message d'erreur si une erreur survient
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  // Affiche la liste des livres
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Gérer les Livres</Text>
      <FlatList
        data={books} // Données à afficher
        keyExtractor={(item) => item.id} // Clé unique pour chaque élément
        renderItem={renderBook} // Fonction pour rendre chaque élément
        contentContainerStyle={{ paddingBottom: 16 }} // Style du conteneur
      />
    </View>
  );
};

export default ManageBooks;