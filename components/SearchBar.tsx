import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

export function Searchbar({
    onSearch,
}: {
    onSearch: (value: any) => void,
}) {
    const [searchQuery, setSearchQuery] = useState<string | undefined>('')

    const handleChangeText = (input: string) => {
        setSearchQuery(input)
    }

    useEffect(() => {
        if (searchQuery) {
            onSearch(searchQuery);
        }
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
    </View>
    )
}


const styles = StyleSheet.create({
    searchBarContainer: {
        position: 'relative',
        marginBottom: 20,
    },

    searchBarTextInput: {
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        backgroundColor: "rgb(139, 126, 139)",
        color: "#FFFFFF",
        borderRadius: 20,
    },
})