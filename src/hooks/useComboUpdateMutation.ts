import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { ComboQueryResponse } from "../api/combos";
import { BASE_URL } from "../config/constants";

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
            return axios.put(`${BASE_URL}/api/combos/${comboId}`, updatedCombo)
        },
        onSuccess: onSuccess
    })
}
