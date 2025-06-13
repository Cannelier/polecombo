
import { API_URL } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

export function useFilteredMovesQuery(searchQuery: string) {
    return useQuery({
        queryKey: ["useFilteredMovesQuery", searchQuery],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/api/moves/filter?searchQuery=${searchQuery}`);
            if (!response.ok) {
                throw new Error("Not able to fetch list of all moves")
            }
            const json = await response.json()
            return json ?? [];
        },
    })
}