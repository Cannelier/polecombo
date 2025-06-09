import { ComboQueryResponse } from "@/src/api/combos";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/shared/constants";


export const useCombosQuery = () => {
    return useQuery<ComboQueryResponse[]>({
        queryKey: ["useCombosQuery"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/api/combos`);
            if (!response.ok) {
                throw new Error('useCombosQuery: Failed to fetch combos')
            }
            return response.json()
        },
    })
}


export type Combo = {
    id: number,
    name: string,
    movesInCombo: {
        move: {
            id: number,
            imageUrl: string,
            posaCode: string,
        },
    }[]
}