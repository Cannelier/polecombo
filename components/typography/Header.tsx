import { ReactNode } from "react"
import { ThemedText } from "./ThemedText"

export const Header = ({children}: {children: ReactNode }) => (
    <ThemedText type="title">
        {children}
    </ThemedText>
)