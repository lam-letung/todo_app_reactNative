import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useMemo, useEffect, useContext } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import DropdownComponent from "@/components/dropdownList";
import { Feather } from "@expo/vector-icons";
import MyComponent from "@/components/card";
import { AppContext } from "@/context/appProvider";


const priority = [
    { label: 'All', value: 'All' },
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
];

const typeDisplay = [
    { label: 'List', value: 'List' },
    { label: 'Card', value: 'Card' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        flex: 12,
    },
    iconInput: {
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        justifyContent: 'center'
    },
    viewInput: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewList: {
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
    },
    viewCard: {
        margin: 10,
        color: 'white',
    },
    textDone: {
        textDecorationLine: 'line-through',
    },
    textTodo: {
        flex: 1,
        color: 'white'
    },
    textWhite: {
        color: 'white'
    },
    viewListContainer: {
        flex: 0.85
    },
    containerSort: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})



function Completed() {

    // hook
    const { dataTodoList, setDataTodoList } = useContext(AppContext)
    const theme = useTheme();
    const dataDisplay = dataTodoList.filter(data => data.status === false)
    const [displayTodoList, setDisplayTodoList] = useState(dataDisplay)
    const [name, setName] = useState('')
    const [sort, setSort] = useState('All');
    const [viewType, setViewType] = useState('List');
    useEffect(() => {
        const dataTodoListDisplay = dataTodoList.filter(data => data.status === true)
        if (sort !== null) {
            if (sort === 'All') {
                setDisplayTodoList(dataTodoListDisplay)
            } else {
                const newSort = dataTodoListDisplay.filter(todo => todo.priority === sort)
                setDisplayTodoList(newSort)
            }
        } else {
            setDisplayTodoList(dataTodoListDisplay)
        }
        return () => { }
    }, [sort, dataTodoList])


    // Place handles
    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const handleCheckStatus = (id: string) => {
        const newList = dataTodoList.map((todo) => {
            if (todo.id + '' === id) {
                todo.status = !todo.status
            }
            return todo
        })
        setDataTodoList(newList)
    }

    const handleAddTodo = () => {
        setDataTodoList([...dataTodoList, { id: getRandomArbitrary(0, 1000), name, status: false, priority: 'Low' }])
        setName('')

    }

    const handleDelete = (item: any) => {
        const newList = dataTodoList.filter((todo) => todo !== item)
        setDataTodoList(newList)
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onBackground }]} >

            <View style={[styles.viewListContainer]}>
                <View style={styles.containerSort}>
                    <DropdownComponent
                        placeholder="List"
                        data={typeDisplay}
                        style={{ width: 100, }}
                        value={viewType}
                        setValue={setViewType}
                        iconLeft={() =>
                            viewType === 'List'
                                ?
                                <Feather name="list" size={24} color={theme.colors.onSurface} />
                                :
                                <MaterialCommunityIcons name="card-multiple-outline" size={24} color={theme.colors.onSurface} />}
                    />
                    <DropdownComponent
                        placeholder="Sort"
                        data={priority}
                        style={{ width: 120, }}
                        value={sort}
                        setValue={setSort}
                        iconLeft={() => <MaterialCommunityIcons name="sort-reverse-variant" size={24} color={theme.colors.onSurface} />}
                    />
                </View>
                <FlatList
                    data={displayTodoList}
                    keyExtractor={item => item.id + ''}
                    renderItem={({ item }) => (

                        viewType === 'List' ?

                            <View style={[styles.viewList]}>
                                <RadioButton
                                    id={item.id + ''}
                                    selected={item.status}
                                    color={item.status ? 'green' : 'gray'}
                                    onPress={handleCheckStatus}
                                />
                                <Text style={[styles.textTodo, item.status ? styles.textDone : null]}>
                                    {item.name}
                                </Text>
                                <MaterialCommunityIcons name="trash-can" size={24} color="red" onPress={() => handleDelete(item)} />
                            </View>
                            :
                            <View style={[styles.viewCard]}>
                                <MyComponent
                                    title={item.name}
                                    subtitle={item.priority}
                                    data={item}
                                    onpressLeft={() => handleCheckStatus(item.id + '')}
                                    checkbox
                                    onpressRight={() => handleDelete(item)}
                                />
                            </View>
                    )
                    }
                />
            </View>
        </SafeAreaView >
    );
}

export default Completed;