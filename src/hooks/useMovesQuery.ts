import { MoveArrayModel } from "@/prisma/zod";
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
            const parsedMoves = MoveArrayModel.safeParse(json)

            if (!parsedMoves.success) {
                console.error("Validation error", parsedMoves.error)
                throw Error("Invalid data received from the server for useMovesQuery")
            }
            return parsedMoves.data
        }
    })
}