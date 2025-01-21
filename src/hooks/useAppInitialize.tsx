import React, { useEffect, useState, useRef } from "react";
import { Alert, AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRecentDatesFromDatabase from "../BrodcastReceiver/DateRecente";

const FIRST_LAUNCH_KEY = "isFirstLaunch";
const LAST_DATE_KEY = "lastKnownDate";

const useAppInitialization = () => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const initialCheckDone = useRef<boolean>(false);

  const fetchRecentDates = async () => {
    try {
      const dates = await getRecentDatesFromDatabase();
      console.log("these are dates", dates);
      return dates;
    } catch (err) {
      console.error("Failed to fetch recent dates", err);
      return null;
    }
  };

  const checkFirstLaunch = async () => {
    try {
      if (initialCheckDone.current) return;

      const value = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
      console.log("First launch check value:", value);

      if (value === null) {
        setIsFirstLaunch(true);
        const dates = await fetchRecentDates();
        const recentDateMessage = dates
          ? `New books have been added on: ${dates.creation}`
          : "";

        // Delay the alert slightly to ensure it shows after render
        setTimeout(() => {
          Alert.alert(
            "Welcome!",
            `Thank you for installing our app. This is the last creation date for a book! ${recentDateMessage}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.setItem(FIRST_LAUNCH_KEY, "false");
                  setIsFirstLaunch(false);
                },
              },
            ]
          );
        }, 100);
      } else {
        setIsFirstLaunch(false);
      }
      initialCheckDone.current = true;
    } catch (error) {
      console.error("Error checking first launch:", error);
    }
  };

  const checkDateChange = async () => {
    try {
      const lastDateStr = await AsyncStorage.getItem(LAST_DATE_KEY);
      const currentDate = new Date(); // fetch from the device

      if (lastDateStr) {
        const lastDate = new Date(lastDateStr);
        const timeDifference = Math.abs(
          currentDate.getTime() - lastDate.getTime()
        );

        if (timeDifference > 1000 * 60 * 5) {
          // if there is a difference of 5 minutes
          setDateChanged(true);
          Alert.alert(
            "Date Change Detected",
            "We noticed that your device date has been modified.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.setItem(
                    LAST_DATE_KEY,
                    currentDate.toISOString()
                  );
                  setDateChanged(false);
                },
              },
            ]
          );
        }
      }

      await AsyncStorage.setItem(LAST_DATE_KEY, currentDate.toISOString());
    } catch (error) {
      console.error("Error checking date change:", error);
    }
  };

  useEffect(() => {
    // Perform initial checks
    const initialize = async () => {
      await checkFirstLaunch();
      await checkDateChange();
    };

    initialize();

    // Set up app state listener
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        checkDateChange();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []); // Empty dependency array to run only once

  return {
    isFirstLaunch,
    dateChanged,
  };
};

export default useAppInitialization;
