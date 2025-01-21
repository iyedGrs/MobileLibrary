import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { supabase } from "../supaBaseClient";

const TASK_NAME = "check-system-date-task";

const getRecentDateFromDatabase = async () => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    if (data && data.length > 0) {
      const { created_at } = data[0];
      return new Date(created_at);
    } else {
      throw new Error("Aucune donnée trouvée");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des dates :", error.message);
    throw error;
  }
};

const checkSystemDate = async () => {
  try {
    const recentDate = await getRecentDateFromDatabase();
    const systemDate = new Date();

    if (systemDate < recentDate) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Avertissement",
          body: "La date du système est inférieure à la date la plus récente dans la base de données. Veuillez vérifier l'heure de votre appareil.",
        },
        trigger: { seconds: 1 },
      });
    }
  } catch (error) {
    console.log("Erreur lors de la vérification des dates :", error);
  }
};

export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission de notification non accordée");
  }
};

TaskManager.defineTask(TASK_NAME, async () => {
  await checkSystemDate();
  return BackgroundFetch.Result.NewData;
});

BackgroundFetch.registerTaskAsync(TASK_NAME, {
  minimumInterval: 60,
  stopOnTerminate: false,
  startOnBoot: true,
});
