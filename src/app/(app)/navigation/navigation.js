import React from "react";
import { useUser } from "@clerk/clerk-expo";

import HomeScreen from "../home";
import Admin from "../../AdminPage/index";
import login from "../../auth/login";
import { Stack } from "expo-router";

const AppNavigator = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <login />;
  }

  const role = user?.publicMetadata?.role || "client";

  return (
    <Stack.Navigator>
      {role === "admin" ? (
        <Stack.Screen name="AdminPage" component={Admin} />
      ) : (
        <Stack.Screen name="HomePage" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};
