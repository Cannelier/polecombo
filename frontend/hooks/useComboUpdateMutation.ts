import { API_URL } from "@/shared/constants";
import { ComboQueryResponse } from "@/src/api/combos";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';

export interface ComboUpdateMutationParams {
    comboId: number,
    updatedCombo: ComboQueryResponse
}

export function useComboUpdateMutation(onSuccess: () => void) {
    return useMutation({
        mutationFn: ({
            comboId,
            updatedCombo,
        } : ComboUpdateMutationParams) => {
            return axios.put(`${API_URL}/api/combos/${comboId}`, updatedCombo)
        },
        onSuccess: onSuccess
    })
}
