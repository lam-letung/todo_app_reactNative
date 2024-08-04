import { createContext, useState } from "react";

const todoListInit: ITodo[] = [
    { id: 1, name: 'MaterialIcons', status: false, priority: "Low", description: 'Deadline', deadline: '10/03/2024' },
    { id: 2, name: 'Learn react native', status: false, priority: "Medium" },
    { id: 3, name: 'Learn react native3', status: false, priority: "High" },
    { id: 4, name: 'Learn react native3', status: false, priority: "High" }
]

export interface ITodo {
    id: number,
    name: string,
    status: boolean,
    priority?: 'Low' | 'Medium' | 'High' | string,
    description?: string,
    deadline?: string
}

interface IValues {
    dataTodoList: ITodo[],
    setDataTodoList: React.Dispatch<React.SetStateAction<ITodo[]>>
}

const initialValues:IValues = {
    dataTodoList: todoListInit,
    setDataTodoList : ()=> {}

}

export const AppContext = createContext<IValues>(initialValues);



function AppProvider({ children }: any) {
    const [dataTodoList, setDataTodoList] = useState<ITodo[]>(todoListInit)

    const values:IValues = {
        dataTodoList,
        setDataTodoList
    }

    return (
        < AppContext.Provider value={values}>
            {children}
        </ AppContext.Provider>
    );
}

export default AppProvider;