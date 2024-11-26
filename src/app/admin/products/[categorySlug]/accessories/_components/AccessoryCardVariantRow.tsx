import ColorCircle from "@/components/ui/color-circle";
import { Variant } from "@/models/variant.model";

interface AccessoryCardVariantRowProps {
    variant: Variant;
}

const AccessoryCardVariantRow = (props: AccessoryCardVariantRowProps) => {
    const price = props.variant.price ? `(+${props.variant.price}€)` : "";
    return (
        <div className="flex gap-2 items-center">
            {props.variant.hexcode && (
                <ColorCircle
                    color={props.variant.hexcode}
                    isTransparent={props.variant.isTransparent}
                />
            )}
            <span>{`${props.variant.name} ${price}`}</span>
        </div>
    );
};

export default AccessoryCardVariantRow;
