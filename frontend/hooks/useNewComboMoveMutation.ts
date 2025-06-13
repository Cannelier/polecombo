import { getQueryClient } from "@/frontend/hooks/useQueryClient";
import { API_URL } from "@/shared/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface NewComboMoveUpdateParams {
    comboId: number,
    moveId: number
}

export function useNewComboMoveMutation(onSuccess?: () => void) {
    const queryClient = getQueryClient()

    return useMutation({
        mutationKey: ["useNewComboMoveMutation"],
        mutationFn: ({
            comboId,
            moveId,
        }: NewComboMoveUpdateParams) => {
            return axios.patch(`${API_URL}/api/combos/${comboId}`, { moveId: moveId })
        },
        onSuccess: () => {
            onSuccess?.()
            queryClient.invalidateQueries()
        }
    })
}