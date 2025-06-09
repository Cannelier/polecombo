import { BASE_URL } from "@/shared/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ImagePickerAsset } from "expo-image-picker";

export function useCustomMoveMutation(onSuccess: (data: { id: string, name: string, imageUrl?: string | null }) => void) {
    return useMutation({
        mutationKey: ["CustomMoveMutation"],
        mutationFn: async ({ moveName, image }: { moveName: string, image: ImagePickerAsset | null }) => {
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

            return axios.post(`${BASE_URL}/api/moves/custom`,
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