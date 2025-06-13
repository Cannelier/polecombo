import { Image } from "expo-image"
import { useEffect, useMemo, useState } from "react"
import { FlatList, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native"
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
    
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const searchBarStyle = isDarkMode ? styles.searchBarTextInput : {
        ...styles.searchBarTextInput,
        backgroundColor: 'rgba(240, 239, 247, 0.62)',
        color: "rgb(152, 152, 186)",
    };

    const searchBarDropDown = isDarkMode ? styles.searchBarDropDown : {
        ...styles.searchBarDropDown,
        backgroundColor: 'rgba(240, 239, 247, 0.62)',
    };
    const searchBarDropDownOption = isDarkMode ? styles.searchBarDropDownOption : {
        ...styles.searchBarDropDownOption,
        borderTopColor: 'rgb(213, 211, 227)',
    };

    const searchBarTextInputExtended = isDarkMode ? styles.searchBarTextInputExtended : {
        ...styles.searchBarTextInputExtended,
        borderBottomColor: 'rgb(213, 211, 227)',
    };

    const optionsWithPlus = useMemo(() => {
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
        return handleAddOption ? [...options, addOption] : options;

    }, [options, searchQuery, handleAddOption])

    // After filteredOptions updates, show dropdown again if query isn't empty
    useEffect(() => {
        if (searchQuery && optionsWithPlus.length > 0) {
            setDisplayDropDown(true)
        }
    }, [optionsWithPlus, searchQuery])
    
    const handleSelect = (item: DropdownItem) => {
        onSelect(item.value)
        setSearchQuery('')
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
                        [searchBarDropDownOption,
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
                // Add custom option
            return (
                <TouchableOpacity
                    onPress={() => {
                        handleAddOption!()}}
                    style={[searchBarDropDownOption,
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
            style={[searchBarStyle,
                optionsWithPlus.length > 0 && displayDropDown ? searchBarTextInputExtended : styles.searchBarTextInputCollapsed ]}
            placeholder="Chercher une figure"
            placeholderTextColor={ isDarkMode ? "#FFFFFF" : "rgb(152, 152, 186)" }
        />
        <Image
            source={require('@/assets/svg/search.svg')}
            style={styles.searchIcon}
            />
        
        { optionsWithPlus.length > 0 && displayDropDown ?
            (<FlatList
                data={optionsWithPlus}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={searchBarDropDown}
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
        fontSize: 14,
        lineHeight: 17,
        textAlignVertical: "top", // necessary on Android, even if counterintuitivet
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