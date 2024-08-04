import { ITodo } from '@/app/(todo)';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { ViewProps, View, StyleProp, ViewStyle, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, useTheme } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { RadioButton } from 'react-native-radio-buttons-group';

const LeftContent = (props: React.JSX.IntrinsicAttributes & ViewProps & React.RefAttributes<View> & { icon: IconSource; size?: number; color?: string; style?: StyleProp<ViewStyle>; theme?: ThemeProp; }) => <Avatar.Icon {...props} icon="folder" />

interface IProps {
    styles?: StyleProp<ViewStyle>
    title: string
    subtitle: string | undefined
    checkbox?: boolean
    data?: ITodo
    onpressLeft?: () => void
    onpressRight?: () => void
}

const styles = StyleSheet.create({
    deadline: {
        flexDirection: 'row',
        alignItems: 'center',
        top: -35,
        left: 70
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
})

const MyComponent = (props: IProps) => {
    const theme = useTheme()
    let dateTime
    if(props.data?.deadline){
        dateTime = format(props.data.deadline,'dd/MM/yyyy')
    }
    return (
        <Card style={[props.styles, props.data?.status && { backgroundColor: '#388e3c' }]}>
            <Card.Title
                titleStyle={{ fontWeight: 'bold', top: -3, maxWidth: 200 }}
                subtitleStyle={[
                    { left: 200, top: -30, width: 80, textAlign: 'center', paddingHorizontal: 10, fontWeight: 'bold', borderRadius: 10 },
                    props.data?.priority === 'High' && { backgroundColor: '#FF0000', color: '#FFFFFF' },
                    props.data?.priority === 'Medium' && { backgroundColor: '#4682B4', color: '#FFFFFF' },
                    props.data?.priority === 'Low' && { backgroundColor: '#D3D3D3', color: '#000000' },
                ]}
                title={props.title}
                subtitle={props.subtitle}
                left={props.checkbox ? () => (
                    <View style={{ top: -14, left: -10 }}>
                        <RadioButton
                            id={props?.data?.id + ''}
                            selected={props?.data?.status}
                            color={props?.data?.status ? 'white' : 'gray'}
                            onPress={props.onpressLeft}
                            size={20}
                        />
                    </View>
                ) :
                    LeftContent
                }
                right={
                    () => (<AntDesign onPress={props.onpressRight} name="close" size={24} color={theme.colors.onSurface} style={{ top: -15, right: 10 }} />)
                }
            />
            {props.data?.deadline &&
                <View style={styles.deadline}>
                    <Entypo name="calendar" size={16} color={theme.colors.secondary} style={{ marginRight: 5 }} />
                    <Text style={{ color: theme.colors.secondary }}>
                        {dateTime}
                    </Text>
                </View>
            }
            {props.data?.description &&
                <Card.Content >
                    {/* <Text variant="titleLarge">Card title</Text> */}
                    <Text style={{ color: theme.colors.onSurface }} >{props.data?.description}</Text>
                </Card.Content>
            }
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            {/* <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions> */}
        </Card>
    )
};

export default MyComponent;