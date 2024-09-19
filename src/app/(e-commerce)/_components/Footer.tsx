import { bebasNeue } from "@/app/fonts";
import Icons from "@/components/icons/Icons";
import { Mail } from "lucide-react";

const Footer = () => {
    return (
        <div
            className={`bg-black text-white flex justify-between p-12 ${bebasNeue.className} tracking-wide`}
        >
            <div className="flex flex-col gap-4">
                <p>Tous droits réservés – Retrometroid 2024</p>
                <div className="flex gap-4">
                    <Icons.Instagram className="w-4 h-4" />
                    <Icons.Tiktok className="w-4 h-4" />
                    <Mail className="w-4 h-4" />
                </div>
            </div>
            <div>
                <p>Mentions légales</p>
                <p>Conditions générales de vente</p>
                <p>Politique de confidentialité</p>
            </div>
        </div>
    );
};

export default Footer;
