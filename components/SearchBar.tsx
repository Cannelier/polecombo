import { Image } from "expo-image"
import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

export function SearchBar({
    onSearch,
}: {
    onSearch: (value: any) => void,
}) {
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
            style={styles.searchBarTextInput}
            placeholder="Search"
            placeholderTextColor="#FFFFFF"
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
        color: "#FFFFFF",
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