
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../config/constants";

export function useMovesQuery() {
    return useQuery({
        queryKey: ["useMovesQuery"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/api/moves`);
            if (!response) {
                throw new Error("Not able to fetch list of all moves")
            }
            const json = await response.json()
            return json.data
        }
    })
}