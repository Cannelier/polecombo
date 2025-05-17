import { useQuery } from "@tanstack/react-query";

export const BASE_URL = "http://localhost:4000"

export const useCombosQuery = () => {
    return useQuery<Combo[]>({
        queryKey: ["useCombosQuery"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/api/combos`);
            if (!response.ok) {
                throw new Error('useCombosQuery: Failed to fetch combos')
            }
            return response.json()
        }
    })
}


export type Combo = {
    id: number,
    name: string,
}