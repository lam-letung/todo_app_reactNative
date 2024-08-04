import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function Home() {
    const theme = useTheme();
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',   backgroundColor: 'red' }}>
            <Text>Home Screen</Text>
            <Link href="/modal">Present modal</Link>
        </View>
    );
}
