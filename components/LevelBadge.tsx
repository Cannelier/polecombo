import { Badge } from "@/components/Badge";
import { Level } from "@/frontend/enums/Level";


export function LevelBadge({ level }: { level: Level }) {
const colorMap: Record<Level, string> = {
    [Level.BEGINNER]: "indigoLight",
    [Level.INTERMEDIATE]: "lila",
    [Level.ADVANCED]: "indigo",
};

const color = colorMap[level] ?? "white";
    return (
        <Badge color={color}>
            {level}
        </Badge>
    );
}
