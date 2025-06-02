import { areFirstLettersFound } from "@/helpers/search"
import { Image } from "expo-image"
import { useMemo, useState } from "react"
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { PlusButton } from "./PlusButton"
import { ThemedText } from "./typography/ThemedText"

export interface DropdownItem {
    label: string,
    value: any,
    imageSource?: string,
    isAddOption?: boolean,
}

export function DropdownSearchbar({
    options,
    onSelect,
    searchQuery,
    setSearchQuery,
    handleAddOption,
}: {
    options: DropdownItem[],
    onSelect: (value: any) => void,
    searchQuery: string,
    setSearchQuery: (value: string) => void,
    handleAddOption?: () => void
}) {
    const [displayDropDown, setDisplayDropDown] = useState<boolean>(false)


    const filteredOptions = useMemo(() => {
        const addOption: DropdownItem = {
            label: "plus",
            value: "plus",
            isAddOption: true,
        }

        // If options haven't loaded, return empty list
        if (!options) return handleAddOption ? [addOption] : [];
        // If nothing was typed, return all options
        if (!searchQuery) return handleAddOption ? [...options, addOption] : options;
        // Return filtered options
        const filtered = options?.filter((option) =>
            areFirstLettersFound(option.label, searchQuery)
            )
        return handleAddOption ? [...filtered, addOption] : filtered;

    }, [options, searchQuery, handleAddOption])

    const handleSelect = (item: DropdownItem) => {
        onSelect(item.value)
        setDisplayDropDown(false)
    }
    const handleChangeText = (input: string) => {
        setSearchQuery(input)
        setDisplayDropDown(true)
    }
    const renderItem = ({ item }: { item: DropdownItem }) =>  {
        if (!item.isAddOption) {
            return (
                <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={
                        [styles.searchBarDropDownOption,
                            item.imageSource ?
                            styles.searchBarDropDownOptionWithImage
                            : styles.searchBarDropDownOptionWithoutImage]}
                    >
                        {item.imageSource &&
                        <Image
                            source={{uri: item.imageSource }}
                            style={styles.optionImage}
                        />}
                        <ThemedText>{item.label}</ThemedText>
                </TouchableOpacity>
            )} else {
                // Add option
            return (
                <TouchableOpacity
                    onPress={() => {
                        handleAddOption!()}}
                    style={[styles.searchBarDropDownOption,
                        styles.plusButtonContainer]}
                    >
                        
                    <PlusButton onPress={() => handleAddOption!()} isLight />
                </TouchableOpacity>
            )
            }
        }
    return (
    <View style={styles.searchBarContainer}>
        <TextInput
            value={searchQuery}
            onChangeText={handleChangeText}
            style={[styles.searchBarTextInput,
                filteredOptions.length > 0 && displayDropDown ? styles.searchBarTextInputExtended : styles.searchBarTextInputCollapsed ]}
            placeholder="Search"
            placeholderTextColor="#FFFFFF"
        />
        <Image
            source={require('@/assets/svg/search.svg')}
            style={styles.searchIcon}
            />
        
        { filteredOptions.length > 0 && displayDropDown ?
            (<FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={styles.searchBarDropDown}
            />)
        : null}
    </View>
    )
}

const imageSize = 60;

const sizeWithoutImage = 40;
const sizeWithImage = imageSize;

const styles = StyleSheet.create({
    searchBarContainer: {
        position: 'relative',
        marginTop: 10,
        marginBottom: 20,
        justifyContent: "center",
    },

    searchBarTextInput: {
        height: 40,
        width: 300,
        paddingHorizontal: 45,
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
    searchIcon: {
        width: 20,
        height: 20,
        position: "absolute",
        top: 10,
        left: 15,
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
        width: "100%",
        
        borderTopColor: "rgb(159, 146, 159)",
        borderTopWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    searchBarDropDownOptionWithImage: {
        height: sizeWithImage
    },
    searchBarDropDownOptionWithoutImage: {
        padding: 10,
        height: sizeWithoutImage
    },
    optionImage: {
        width: imageSize,
        height: imageSize,
        marginRight:10,
    },
    plusButtonContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    plusButton: {
        width: 20,
        height: 20,
    }
})