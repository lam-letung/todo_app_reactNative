import DateComponet from "@/components/date";
import DropdownComponent from "@/components/dropdownList";
import { AppContext } from "@/context/appProvider";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";


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

export const priority = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
];



function Create() {
    const { setDataTodoList, dataTodoList } = useContext(AppContext)
    const theme = useTheme()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priorityInput, setPriorityInput] = useState('Low')
    const [date, setDate] = useState(undefined);
    const [open, setOpen] = useState(false);

    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const handleAdd = () => {
        setDataTodoList([...dataTodoList, { id: getRandomArbitrary(0, 1000), name, status: false, deadline: date, description, priority: priorityInput }])

        setName('')
        setDescription('')
        setPriorityInput('Low')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.onBackground }]}>
                <View style={styles.viewInput}>
                    <View style={styles.containerName}>
                        <TextInput
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

export default Create;