import { Stack } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
const theme = {
    ...MD3DarkTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...MD3DarkTheme.colors,
        onBackground: 'black',
        text: 'white'
    },
};



export default function Layout() {
    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen
                    name="(todo)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </PaperProvider>
    );
}
