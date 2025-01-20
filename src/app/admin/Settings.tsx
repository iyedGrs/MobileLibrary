import React from "react";
import { View, Text, Switch, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Déconnexion", onPress: () => router.replace("/auth/login") },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f3f3" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>
        Paramètres
      </Text>

      {/* Thème de l'application */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Mode sombre</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
        />
      </View>

      {/* Notifications */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>Activer les notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>


      {/* Déconnexion */}
      <TouchableOpacity
        style={{ backgroundColor: "#E94F47", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginBottom: 16 }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
          Déconnexion
        </Text>
      </TouchableOpacity>

      {/* Supprimer le compte */}
      <TouchableOpacity
        style={{ backgroundColor: "#ff4444", paddingVertical: 12, borderRadius: 8, alignItems: "center" }}
        onPress={() => Alert.alert("Supprimer le compte", "Cette action est irréversible. Êtes-vous sûr ?")}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
          Supprimer le compte
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;