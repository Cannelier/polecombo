
import { useQuery } from "@tanstack/react-query";
import { MovesData, MovesSchema } from "../api/moves";
import { BASE_URL } from "../config/constants";

export function useMovesQuery() {
    return useQuery<MovesData>({
        queryKey: ["useMovesQuery"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/api/moves`);
            if (!response) {
                throw new Error("Not able to fetch list of all moves")
            }
            const json = await response.json()
            const parsedMoves = MovesSchema.safeParse(json)

            if (!parsedMoves.success) {
                console.error("Validation error", parsedMoves.error)
                throw Error("Invalid data received from the server for useMovesQuery")
            }
            return parsedMoves.data
        }
    })
}