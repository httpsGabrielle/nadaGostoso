import { createNativeStackNavigator }
    from '@react-navigation/native-stack'
import { NavigationContainer, StackActions }
    from '@react-navigation/native'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Recipes from '../pages/Recipes'
import newRecipe from '../pages/newRecipe'
import ViewRecipe from '../pages/ViewRecipe'
const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={SignIn} />
            <Stack.Screen
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUp} />
            <Stack.Screen
                name="Recipes"
                options={{ headerShown: false }}
                component={Recipes} />
            <Stack.Screen
                name="addRecipe"
                options={{ headerShown: false }}
                component={newRecipe} />
            <Stack.Screen
                name="View"
                options={{ headerShown: false }}
                component={ViewRecipe} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}