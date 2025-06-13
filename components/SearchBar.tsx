import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

export function SearchBar({
    onSearch,
}: {
    onSearch: (value: any) => void,
}) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const searchBarStyle = isDarkMode ? styles.searchBarTextInput : {
        ...styles.searchBarTextInput,
        backgroundColor: 'rgba(240, 239, 247, 0.62)',
        color: "#FFFFFF",
    };

    const [searchQuery, setSearchQuery] = useState<string | undefined>('')

    const handleChangeText = (input: string) => {
        setSearchQuery(input)
    }

    useEffect(() => {
        onSearch(searchQuery ?? '');
    }, [onSearch, searchQuery])

    return (
    <View style={styles.searchBarContainer}>
        <TextInput
            onChangeText={(input: string) => { handleChangeText(input) }}
            value={searchQuery}
            style={searchBarStyle}
            placeholder="Rechercher"
            placeholderTextColor={ isDarkMode ? "#FFFFFF" : "rgb(152, 152, 186)" }
        />
        <Image
            source={require('@/assets/svg/search.svg')}
            style={styles.searchIcon}
            />
    </View>
    )
}


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
        color: "rgb(152, 152, 186)",
        borderRadius: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        position: "absolute",
        top: 10,
        left: 15,
    }
})