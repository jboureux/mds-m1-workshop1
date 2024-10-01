import { Variant } from "@/models/variant.model";
import Image from "next/image";

interface ConsolePreviewProps {
    view: string;
    console: string;
    selectedOptions: {
        accessoryId: string;
        variant: Variant;
        isBase?: boolean;
    }[];
}

const ConsolePreview = (props: ConsolePreviewProps) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/images/`;

    const getBase = () => {
        const baseImages = props.selectedOptions.find(
            (option) => option.isBase
        );
        const baseImage =
            baseImages && baseImages.variant.images
                ? baseImages.variant.images.find((image) => props.view in image)
                : undefined;

        if (baseImage === undefined) {
            return undefined;
        }

        return baseImage[props.view as keyof typeof baseImage];
    };

    const getLayers = (): string[] => {
        const noBaseLayers = props.selectedOptions.filter(
            (option) =>
                option.variant && option.variant.images && !option.isBase
        );

        console.log(noBaseLayers);
        console.log("ok");

        return noBaseLayers
            .map((layer) => {
                const images = layer.variant.images ? layer.variant.images : [];
                if (images && images.length > 0) {
                    const image = images.find((image) => props.view in image);
                    console.log(image);
                    return image && image[props.view as keyof typeof image];
                }
                return undefined;
            })
            .filter((layer) => layer !== undefined);
    };

    if (getBase() === undefined)
        return (
            <p className="text-red-500 text-xs text-center px-12">
                {`Aucune image trouvée pour ${props.console} ${props.view}`}
            </p>
        );

    return (
        <div className="grid grid-cols-1 grid-rows-1 w-fit h-fit">
            <Image
                src={`${imageUrl}${getBase()}`}
                alt="Console Preview"
                className="col-start-1 row-start-1 w-auto h-auto select-none"
                width={300}
                height={300}
                draggable={false}
                priority
            />
            {getLayers().map((layer) => (
                <Image
                    key={layer as string}
                    src={`${imageUrl}${layer}`}
                    alt="Console Preview"
                    width={300}
                    height={300}
                    className="col-start-1 row-start-1 w-auto h-auto select-none"
                    draggable={false}
                    priority
                />
            ))}
        </div>
    );
};

export default ConsolePreview;
