import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../config/constants";

export function useCustomMoveMutation(onSuccess: (data: { id: string }) => void) {
    return useMutation({
        mutationKey: ["CustomMoveMutation"],
        mutationFn: ({ moveName }: { moveName: string}) => {
            return axios.post(`${BASE_URL}/api/moves`, {
                moveName
            })
        },
        onSuccess: (response) => onSuccess(response.data)
    })
}