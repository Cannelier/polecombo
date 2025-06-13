import { API_URL } from '@/frontend/constants/env';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker";

export function useCustomMoveMutation(onSuccess: (data: { id: string, displayName: string, imageUrl?: string | null }) => void) {
    return useMutation({
        mutationKey: ["CustomMoveMutation"],
        mutationFn: async ({ userId, moveName, image }: useCustomMoveMutationParams) => {
            const formData = new FormData();
            formData.append('moveName', moveName);
            
            // Upload image if any
            if (image) {
                const filename = `${moveName}.png`;
                formData.append('file', {
                    uri: image.uri,
                    name: filename,
                    type: 'image/png',
                } as any);
            }

            return axios.post(`${API_URL}/api/moves/user/${userId}/custom`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
        },
        onSuccess: (response) => onSuccess(response.data)
    })
}

interface useCustomMoveMutationParams {
    userId: string,
    moveName: string,
    image: ImagePickerAsset | null 
}