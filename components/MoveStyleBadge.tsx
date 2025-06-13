import { Badge } from "@/components/Badge";
import { MoveStyle } from "@/frontend/enums/MoveStyle";


export function MoveStyleBadge({ moveStyle }: { moveStyle: MoveStyle }) {
const colorMap: Record<MoveStyle, string> = {
    [MoveStyle.STATIC]: "orange",
    [MoveStyle.STATICSPIN]: "brown",
    [MoveStyle.SPIN]: "lila",
    [MoveStyle.DYNAMIC]: "orangeLight",
    [MoveStyle.FLEXIBILITY]: "indigoLight",
    [MoveStyle.STRENGTH]: "brown",
};

const color = colorMap[moveStyle] ?? "white";
    return (
        <Badge color={color}>
            {moveStyle}
        </Badge>
    );
}
