import Image from "next/image";
import { Variant } from "../_providers/configurator-provider";

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
    const imageFolder = `/configurator-assets/${props.console}/${props.view}/`;

    const getBase = () => {
        const baseImages = props.selectedOptions.find(
            (option) => option.isBase
        );
        return baseImages &&
            baseImages.variant.images &&
            props.view in baseImages.variant.images
            ? baseImages.variant.images[
                  props.view as keyof typeof baseImages.variant.images
              ]
            : undefined;
    };

    const getLayers = (): string[] => {
        const noBaseLayers = props.selectedOptions.filter(
            (option) => option.variant.images && !option.isBase
        );
        return noBaseLayers
            .map((layer) =>
                layer.variant.images
                    ? layer.variant.images[
                          props.view as keyof typeof layer.variant.images
                      ]
                    : undefined
            )
            .filter((layer) => layer !== undefined);
    };

    if (getBase() === undefined)
        return (
            <p className="text-red-500">
                {`Aucune image trouvée pour ${props.console} ${props.view}`}
            </p>
        );

    return (
        <div className="grid grid-cols-1 grid-rows-1 w-fit h-fit">
            <Image
                src={`${imageFolder}${getBase()}`}
                alt="Console Preview"
                className="col-start-1 row-start-1 w-auto h-auto select-none"
                width={300}
                height={300}
                draggable={false}
            />
            {getLayers().map((layer) => (
                <Image
                    key={layer as string}
                    src={`${imageFolder}${layer}`}
                    alt="Console Preview"
                    width={300}
                    height={300}
                    className="col-start-1 row-start-1 w-auto h-auto select-none"
                    draggable={false}
                />
            ))}
        </div>
    );
};

export default ConsolePreview;
