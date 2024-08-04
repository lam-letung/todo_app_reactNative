import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Icon } from '@expo/vector-icons/build/createIconSet';

interface IProps {
    label?: string,
    placeholder?: string
    search?: boolean
    searchPlaceholder?: string
    data: { label: string, value: string }[]
    style?: StyleProp<ViewStyle>
    value: string | null
    setValue: React.Dispatch<React.SetStateAction<any>>
    iconLeft:  ((visible?: boolean) => JSX.Element | null | undefined) | undefined
}

const DropdownComponent = (props: IProps) => {
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (props.value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'white' }]}>
                    {props.label}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={[styles.container, props.style]}>
            {renderLabel()}
            <Dropdown
                itemContainerStyle={{ backgroundColor: "#808080", }}
                containerStyle={{ borderRadius: 10, overflow: "hidden", backgroundColor: "#808080", }}
                itemTextStyle={{ color: '#333' }}
                style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.data}
                search={props.search}
                // maxHeight={}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? props.placeholder ?? 'Select item' : ''}
                searchPlaceholder={props.searchPlaceholder}
                value={props.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    props.setValue(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={props.iconLeft
                    // <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'white' : 'white'}
                    //     name={props.icon }
                    //     size={20}
                    // />
                }
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignSelf: 'flex-end',
    },
    dropdown: {
        height: 50,
        paddingHorizontal: 8,
        color: 'black',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'black',
        left: 25,
        top: 1,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
    },
    placeholderStyle: {
        fontSize: 12,
        color: 'white',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});