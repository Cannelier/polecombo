import { API_URL } from '@/frontend/constants/env';
import { useQuery } from "@tanstack/react-query";
import { ComboQueryResponse } from "../api/combos";


export function useComboQuery(comboId: number) {
    return useQuery<ComboQueryResponse>({
        queryKey: ["useComboQuery", comboId],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/api/combos/${comboId}`);
            if (!response.ok) {
                throw new Error(`Could not fetch combo ID ${comboId}`)
            }
            return response.json()
        }
    })
}
