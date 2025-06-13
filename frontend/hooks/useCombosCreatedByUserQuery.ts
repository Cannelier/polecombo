import { API_URL } from '@/frontend/constants/env';
import { ComboQueryResponse } from "@/src/api/combos";
import { useQuery } from "@tanstack/react-query";


export const useCombosCreatedByUserQuery = (userId: string | undefined) => {
    return useQuery<ComboQueryResponse[]>({
        queryKey: ["useCombosCreatedByUserQuery", userId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/api/combos/user/${userId}`);
            if (!response.ok) {
                throw new Error(`useCombosQuery: Failed to fetch combos for user ${userId}`)
            }
            return response.json()
        },
        enabled: !!userId,
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