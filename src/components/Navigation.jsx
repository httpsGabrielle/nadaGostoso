import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "../pages/Splash";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Recipes from "../pages/Recipes";
import NewRecipe from "../pages/NewRecipe";
import ViewRecipe from "../pages/ViewRecipe";

import { AuthContext } from "../contexts/AuthContext";
import Header from "./Header";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { loading, user } = useContext(AuthContext)

  if (loading) {
    return (
      <Splash />
    )
  }

  return (
    <Stack.Navigator>
      {user === null ? (
        <>
          <Stack.Screen 
            name="Login"
            options={{ headerShown: false }}
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUp}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Recipes"
            options={{
              header: () => <Header />
            }}
            component={Recipes}
          />
          <Stack.Screen
            name="addRecipe"
            options={{
              header: () => <Header />
            }}
            component={NewRecipe}
          />
          <Stack.Screen
            name="View"
            options={{
              header: () => <Header />
            }}
            component={ViewRecipe}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

export default Navigation
