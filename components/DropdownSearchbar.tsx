import { useState } from "react"
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { ThemedText } from "./typography/ThemedText"

export interface Item {
    label: string,
    value: any,
}

export function DropdownSearchbar({
    options,
    onSelect,
}: {
    options: Item[],
    onSelect: (value: any) => void,
}) {
    const [displayDropDown, setDisplayDropDown] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string | undefined>('')
    const filteredOptions = searchQuery ? options.filter((option) => option.label.includes(searchQuery)) : []

    const handleSelect = (item: Item) => {
        onSelect(item.value)
        setDisplayDropDown(false)
    }
    const handleChangeText = (input: string) => {
        setSearchQuery(input)
        setDisplayDropDown(true)
    }

    return (
    <View style={styles.searchBarContainer}>
        <TextInput
            onChangeText={(input: string) => { handleChangeText(input) }}
            value={searchQuery}
            style={[styles.searchBarTextInput,
                filteredOptions.length > 0 && displayDropDown ? styles.searchBarTextInputExtended : styles.searchBarTextInputCollapsed ]}
            placeholder="Search"
            placeholderTextColor="#FFFFFF"
        />
        
        { filteredOptions.length > 0 && displayDropDown ?
            (<FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>  {
                    return (
                        <TouchableOpacity
                            onPress={() => handleSelect(item)}
                            style={styles.searchBarDropDownOption}
                            >
                                <ThemedText>{item.label}</ThemedText>
                        </TouchableOpacity>
                    )}
                }
                style={styles.searchBarDropDown}
            />)
        : null}
    </View>
    )
}


const styles = StyleSheet.create({
    searchBarContainer: {
        position: 'relative',
    },

    searchBarTextInput: {
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        backgroundColor: "rgb(139, 126, 139)",
        color: "#FFFFFF",
    },
    searchBarTextInputCollapsed: {
        borderRadius: 20,
    },
    searchBarTextInputExtended: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomColor:  "rgb(159, 146, 159)",
        borderBottomWidth: 0.5,
    },
    searchBarDropDown: {
        maxHeight: 150, // <- Important to make it expand visibly
        position: 'absolute',
        top: 40, // ⬅️ height of TextInput
        left: 0,
        right: 0,
        zIndex: 999,

        backgroundColor: "rgb(139, 126, 139)",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    searchBarDropDownOption: {
        height: 40,
        width: "100%",
        padding: 10,
        
        borderTopColor: "rgb(159, 146, 159)",
        borderTopWidth: 0.5,
    }

})