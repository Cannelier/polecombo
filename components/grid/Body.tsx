import { ReactNode } from "react";
import { ThemedView } from "../ThemedView";

export const Body = ({children}: {children: ReactNode }) => (
    <ThemedView style={{ padding: 30 }}>
      {children}
    </ThemedView>
)