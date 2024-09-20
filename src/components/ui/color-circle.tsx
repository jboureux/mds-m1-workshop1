import { cn } from "@/lib/utils";

interface ColorCircleProps {
    color: string;
    isTransparent?: boolean;
    className?: string;
}

const ColorCircle = (props: ColorCircleProps) => {
    return (
        <span
            className={cn("w-6 h-6 rounded-full relative", props.className)}
            style={{
                backgroundColor: props.color,
                transform: "rotate(-135deg)",
            }}
        >
            {props.isTransparent && (
                <span
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `linear-gradient(to right, transparent 50%, rgba(255,255,255,0.5) 50%)`,
                    }}
                ></span>
            )}
        </span>
    );
};

export default ColorCircle;
