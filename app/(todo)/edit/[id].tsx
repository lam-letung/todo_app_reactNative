import DateComponet from "@/components/date";
import DropdownComponent from "@/components/dropdownList";
import { AppContext, ITodo } from "@/context/appProvider";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter, useSegments } from "expo-router";
import { useContext, useEffect, useId, useRef, useState } from "react";
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { priority } from "../create";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    viewInput: {
        margin: 10,
        gap: 20,
        flex: 1
    },
    inputName: {
        flex: 1
    }

})

function Edit() {
    const inputId = useId()
    const router = useRouter();
    const theme = useTheme()
    const navigation = useNavigation()
    const { dataTodoList, setDataTodoList } = useContext(AppContext)
    const { id } = useLocalSearchParams();
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [priorityInput, setPriorityInput] = useState()
    const [date, setDate] = useState();
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dataTodoList.forEach((item) => {
            if (item.id == +id) {
                setName(item.name)
                setDescription(item.description)
                setPriorityInput(item.priority)
                setDate(item.deadline)
            }
        })

        return () => {

        }
    }, [id])


    const handleAdd = () => {
        const newTodoList: ITodo[] = dataTodoList.filter(item => item.id != id)
        setDataTodoList([...newTodoList, { id, name, status: false, deadline: date, description, priority: priorityInput }])

        // setName('')
        // setDescription('')
        // setPriorityInput('Low')
        router.navigate('/')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onBackground }]}>
                <View style={styles.viewInput}>
                    <View style={styles.containerName}>
                        <TextInput
                            id={inputId}
                            mode="outlined"
                            label={'Name todo'}
                            onChangeText={(v) => setName(v)}
                            value={name}
                            style={styles.inputName}
                            onBlur={Keyboard.dismiss}
                        />
                        <Entypo name="calendar" size={24} color="white" onPress={() => setOpen(true)} />
                    </View>
                    <DateComponet
                        date={date}
                        open={open}
                        setDate={setDate}
                        setOpen={setOpen}
                        label="Deadline"
                    />
                    <TextInput
                        mode="outlined"
                        label={'Description'}
                        onChangeText={(v) => setDescription(v)}
                        value={description}
                        multiline
                        numberOfLines={4}
                        onBlur={Keyboard.dismiss}

                    />
                    <DropdownComponent
                        placeholder="Priority"
                        data={priority}
                        style={{ width: '100%', borderWidth: 1, borderColor: 'white' }}
                        value={priorityInput}
                        setValue={setPriorityInput}
                        iconLeft={() => <MaterialCommunityIcons name="sort-reverse-variant" size={24} color={theme.colors.onSurface} />}
                    />
                    <Button title="Submit" onPress={handleAdd} />

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Edit;