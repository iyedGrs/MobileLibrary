import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { THEME_COLORS } from "../../../constants/config";

// Définir le type pour un livre
interface Livre {
  id: string;
  titre: string;
  auteur: string;
  disponible: boolean;
  categorie: string;
  favori: boolean; // Ajout d'une propriété pour les favoris
}

// Exemple de données pour les livres
const livres: Livre[] = [
  { id: '1', titre: 'Livre Un', auteur: 'Auteur Un', disponible: true, categorie: 'Fiction', favori: false },
  { id: '2', titre: 'Livre Deux', auteur: 'Auteur Deux', disponible: false, categorie: 'Science', favori: false },
  { id: '3', titre: 'Livre Trois', auteur: 'Auteur Trois', disponible: true, categorie: 'Histoire', favori: false },
  // Ajouter plus de livres ici
];

const LivrePage = () => {
  const [recherche, setRecherche] = useState(''); // État pour la recherche
  const [categorie, setCategorie] = useState(''); // État pour la catégorie de filtrage
  const [livresFiltres, setLivresFiltres] = useState<Livre[]>(livres); // Type explicite pour l'état
  const [livresEmpruntes, setLivresEmpruntes] = useState<Livre[]>([]); // État pour stocker les livres empruntés

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
      setLivresEmpruntes([...livresEmpruntes, livreEmprunte]);
      Alert.alert('Succès', 'Livre emprunté avec succès!');
    } else {
      Alert.alert('Erreur', 'Le livre n\'est pas disponible.');
    }
  };

  // Fonction pour annuler l'emprunt d'un livre
  const annulerEmprunt = (idLivre: string) => {
    const livreAnnule = livresEmpruntes.find(livre => livre.id === idLivre);
    if (livreAnnule) {
      setLivresEmpruntes(livresEmpruntes.filter(livre => livre.id !== idLivre));
      setLivresFiltres(livresFiltres.map(livre =>
        livre.id === idLivre ? { ...livre, disponible: true } : livre
      ));
      Alert.alert('Succès', 'Emprunt annulé avec succès!');
    }
  };

  // Fonction pour ajouter ou retirer un livre des favoris
  const gererFavori = (idLivre: string) => {
    setLivresFiltres(livresFiltres.map(livre =>
      livre.id === idLivre ? { ...livre, favori: !livre.favori } : livre
    ));
  };

  // Fonction pour afficher les livres empruntés
  const afficherLivresEmpruntes = () => {
    if (livresEmpruntes.length === 0) {
      Alert.alert('Aucun emprunt', 'Aucun livre emprunté.');
    }
  };

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Bibliothèque</Text>

      {/* Zone de recherche */}
      <View style={styles.rechercheContainer}>
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
      </View>

      {/* Liste des livres */}
      <FlatList
        data={livresFiltres}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.livreItem}>
            <Text style={styles.titreLivre}>{item.titre}</Text>
            <Text style={styles.auteurLivre}>{item.auteur}</Text>
            <Text style={styles.categorieLivre}>{item.categorie}</Text>

            {/* Bouton emprunter */}
            <TouchableOpacity
              style={[styles.boutonEmprunt, item.disponible ? styles.disponible : styles.indisponible]}
              onPress={() => gererEmprunt(item.id)}
              disabled={!item.disponible}
            >
              <Text style={styles.texteBoutonEmprunt}>
                {item.disponible ? 'Emprunter' : 'Indisponible'}
              </Text>
            </TouchableOpacity>

            {/* Bouton pour marquer comme favori */}
            <TouchableOpacity
              style={styles.boutonFavori}
              onPress={() => gererFavori(item.id)}
            >
              <Ionicons
                name={item.favori ? 'heart' : 'heart-outline'}
                size={24}
                color={item.favori ? '#e74c3c' : '#7f8c8d'}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bouton pour afficher les livres empruntés */}
      <TouchableOpacity
        style={styles.boutonEmprunt}
        onPress={afficherLivresEmpruntes}
      >
        <Text style={styles.texteBoutonEmprunt}>Voir les livres empruntés</Text>
      </TouchableOpacity>

      {/* Affichage du tableau des livres empruntés */}
      {livresEmpruntes.length > 0 && (
        <View style={styles.tableauContainer}>
          <Text style={styles.tableauTitre}>Livres Empruntés</Text>
          <FlatList
            data={livresEmpruntes}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.livreEmprunteRow}>
                <Text style={styles.livreEmprunteCell}>{item.titre}</Text>
                <Text style={styles.livreEmprunteCell}>{item.auteur}</Text>
                <Text style={styles.livreEmprunteCell}>{item.categorie}</Text>
                <Text style={styles.livreEmprunteCell}>{item.disponible ? 'Disponible' : 'Emprunté'}</Text>

                {/* Bouton Annuler l'emprunt */}
                <TouchableOpacity
                  style={styles.boutonAnnuler}
                  onPress={() => annulerEmprunt(item.id)}
                >
                  <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  rechercheContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 10,
    paddingVertical: 10,
  },
  champRecherche: {
    height: 45,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 5,
  },
  livreItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titreLivre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  auteurLivre: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  categorieLivre: {
    fontSize: 14,
    color: '#95A5A6',
  },
  boutonEmprunt: {
    padding: 10,
    backgroundColor: THEME_COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disponible: {
    backgroundColor: '#27AE60',
  },
  indisponible: {
    backgroundColor: '#E74C3C',
  },
  texteBoutonEmprunt: {
    color: '#ffffff',
    fontSize: 16,
  },
  boutonFavori: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  tableauContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tableauTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 10,
  },
  livreEmprunteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  livreEmprunteCell: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
  },
  boutonAnnuler: {
    backgroundColor: '#E74C3C',
    padding: 5,
    borderRadius: 5,
  },
  texteBoutonAnnuler: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LivrePage;
