import { API_URL } from "@/shared/constants";
import { ComboQueryResponse } from "@/src/api/combos";
import { useQuery } from "@tanstack/react-query";


export const useCombosQuery = () => {
    return useQuery<ComboQueryResponse[]>({
        queryKey: ["useCombosQuery"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/api/combos`);
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