import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import TabBar from '@/components/TabBar';
import AppProvider from '@/context/appProvider';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';


export default function Layout() {
    const theme = useTheme();
    return (
        <AppProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Tabs
                    tabBar={props => <TabBar {...props} />}

                    screenOptions={{
                        headerStyle: {
                            backgroundColor: theme.colors.onBackground,
                        },
                        headerTintColor: 'black',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            headerTintColor: 'white',
                            title: 'Home',
                        }}
                    />
                    <Tabs.Screen
                        name="completed"
                        options={{
                            headerTintColor: 'white',
                            title: 'Completed',
                        }}
                    />
                    <Tabs.Screen
                        name="create"
                        options={{
                            headerTintColor: 'white',
                            title: 'Create',
                        }}
                    />
                    <Tabs.Screen
                        name="explore"
                        options={{
                            headerTintColor: 'white',
                            title: 'Explore',
                        }}
                    />

                    <Tabs.Screen
                        name="profile"
                        options={{
                            headerTintColor: 'white',
                            title: 'Profile',
                        }}
                    />


                </Tabs>
            </TouchableWithoutFeedback>
        </AppProvider>
    );
}
