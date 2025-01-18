/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Dummy data for books
const books = [
  { id: '1', title: 'Book 1', author: 'Author One', available: true },
  { id: '2', title: 'Book 2', author: 'Author Two', available: false },
  { id: '3', title: 'Book 3', author: 'Author Three', available: true },
];

const BorrowBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBorrow = (bookId: string) => {
    const updatedBooks = filteredBooks.map(book => {
      if (book.id === bookId && book.available) {
        return { ...book, available: false }; // Mark as borrowed
      }
      return book;
    });
    setFilteredBooks(updatedBooks);
    alert('Book borrowed successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrow a Book</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or author"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <TouchableOpacity
              style={[
                styles.borrowButton,
                item.available ? styles.available : styles.unavailable
              ]}
              onPress={() => handleBorrow(item.id)}
              disabled={!item.available}
            >
              <Text style={styles.borrowButtonText}>
                {item.available ? 'Borrow' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bookItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  borrowButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  available: {
    backgroundColor: '#28a745',
  },
  unavailable: {
    backgroundColor: '#ccc',
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BorrowBook; */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


// Exemple de données pour les livres
const livres = [
  { id: '1', titre: 'Livre Un', auteur: 'Auteur Un', disponible: true, categorie: 'Fiction' },
  { id: '2', titre: 'Livre Deux', auteur: 'Auteur Deux', disponible: false, categorie: 'Science' },
  { id: '3', titre: 'Livre Trois', auteur: 'Auteur Trois', disponible: true, categorie: 'Histoire' },
  // Ajouter plus de livres ici
];

const LivrePage = () => {
  const [recherche, setRecherche] = useState(''); // État pour la recherche
  const [categorie, setCategorie] = useState(''); // État pour la catégorie de filtrage
  const [livresFiltres, setLivresFiltres] = useState(livres); // État pour les livres filtrés

  // Fonction de filtrage
  const gererFiltrage = (requete: string, categorie: string) => {
    const filtres = livres.filter(livre =>
      (livre.titre.toLowerCase().includes(requete.toLowerCase()) ||
       livre.auteur.toLowerCase().includes(requete.toLowerCase())) &&
      (categorie === '' || livre.categorie === categorie)
    );
    setLivresFiltres(filtres);
  };

  // Fonction pour gérer la recherche
  const gererRecherche = (requete: string) => {
    setRecherche(requete);
    gererFiltrage(requete, categorie);
  };

  // Fonction pour gérer le changement de catégorie
  const gererCategorie = (categorieSelectionnee: string) => {
    setCategorie(categorieSelectionnee);
    gererFiltrage(recherche, categorieSelectionnee);
  };

  // Fonction pour emprunter un livre
  const gererEmprunt = (idLivre: string) => {
    const livreEmprunte = livresFiltres.find(livre => livre.id === idLivre);
    if (livreEmprunte && livreEmprunte.disponible) {
      setLivresFiltres(livresFiltres.map(livre =>
        livre.id === idLivre ? { ...livre, disponible: false } : livre
      ));
      Alert.alert('Succès', 'Livre emprunté avec succès!');
    } else {
      Alert.alert('Erreur', 'Le livre n\'est pas disponible.');
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Bibliothèque</Text>
      <TextInput
        style={styles.champRecherche}
        placeholder="Rechercher par titre ou auteur"
        value={recherche}
        onChangeText={gererRecherche}
      />
      <Picker
        selectedValue={categorie}
        style={styles.picker}
        onValueChange={(itemValue) => gererCategorie(itemValue)}
      >
        <Picker.Item label="Toutes les catégories" value="" />
        <Picker.Item label="Fiction" value="Fiction" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="Histoire" value="Histoire" />
        {/* Ajouter plus de catégories ici */}
      </Picker>
      <FlatList
        data={livresFiltres}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.livreItem}>
            <Text style={styles.titreLivre}>{item.titre}</Text>
            <Text style={styles.auteurLivre}>{item.auteur}</Text>
            <Text style={styles.categorieLivre}>{item.categorie}</Text>
            <TouchableOpacity
              style={[styles.boutonEmprunt, item.disponible ? styles.disponible : styles.indisponible]}
              onPress={() => gererEmprunt(item.id)}
              disabled={!item.disponible}
            >
              <Text style={styles.texteBoutonEmprunt}>
                {item.disponible ? 'Emprunter' : 'Indisponible'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  champRecherche: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  livreItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  titreLivre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  auteurLivre: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  categorieLivre: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  boutonEmprunt: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disponible: {
    backgroundColor: '#28a745',
  },
  indisponible: {
    backgroundColor: '#ccc',
  },
  texteBoutonEmprunt: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LivrePage;

