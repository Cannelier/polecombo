
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/constants";

export function useFilteredMovesQuery(searchQuery: string) {
    return useQuery({
        queryKey: ["useFilteredMovesQuery", searchQuery],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/api/moves/filter?searchQuery=${searchQuery}`);
            if (!response.ok) {
                throw new Error("Not able to fetch list of all moves")
            }
            const json = await response.json()
            return json ?? [];
        },
    })
}