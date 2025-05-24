export function areFirstLettersFound(
    stringToSearch: string,
    searchQuery: string,
): boolean {
    const wordsInString = stringToSearch.toLowerCase().split(" ");
    const matches = wordsInString.filter((word) =>
        word.startsWith(searchQuery.toLowerCase())
    );
    return matches.length > 0;
}