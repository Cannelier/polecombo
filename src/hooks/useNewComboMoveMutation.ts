import { getQueryClient } from "@/src/hooks/useQueryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/constants";

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
            return axios.patch(`${BASE_URL}/api/combos/${comboId}`, { moveId: moveId })
        },
        onSuccess: () => {
            console.log("Mutation succeeded");
            onSuccess?.()
            queryClient.invalidateQueries()
        }
    })
}