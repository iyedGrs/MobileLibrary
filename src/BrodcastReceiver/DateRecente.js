// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";
// import * as Notifications from "expo-notifications";
// import { supabase } from "../supaBaseClient";
// import { Alert } from "react-native";

// const TASK_NAME = "fetch-dates-task";

// const getRecentDatesFromDatabase = async () => {
//   try {
//     const { data, error } = await supabase
//       .from("books")
//       .select("created_at")
//       .order("created_at", { ascending: false });

//     if (error) {
//       throw new Error(error.message);
//     }

//     if (data && data.length > 0) {
//       const { created_at } = data[0];
//       return {
//         creation: created_at ? new Date(created_at) : null,
//       };
//     } else {
//       throw new Error("Aucune donnée trouvée");
//     }
//   } catch (error) {
//     console.error("Erreur lors de la récupération des dates :", error.message);
//     throw error;
//   }
// };
// export const requestPermissions = async () => {
//   const { status } = await Notifications.requestPermissionsAsync();
//   if (status !== "granted") {
//     console.log("Permission de notification non accordée");
//   }
// };
// requestPermissions();

// TaskManager.defineTask(TASK_NAME, async () => {
//   try {
//     const dates = await getRecentDatesFromDatabase();

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Dernières dates",
//         body: `Les dates les plus récentes sont :
//                Création : ${dates.creation}`,
//       },
//       trigger: { seconds: 1 },
//     });
//   } catch (error) {
//     console.log("Erreur lors de la récupération des dates :", error);
//   }
//   return BackgroundFetch.Result.NewData;
// });

// export const registerTaskAsync = async () =>
//   BackgroundFetch.registerTaskAsync(TASK_NAME, {
//     minimumInterval: 60,
//     stopOnTerminate: false,
//     startOnBoot: true,
//   });

// export default getRecentDatesFromDatabase;
