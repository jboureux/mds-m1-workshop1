import { bebasNeue } from "@/app/fonts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InfoCard = () => {
    const tabsTriggerClasses = `
        text-xl ${bebasNeue.className}
        data-[state=active]:shadow-none 
        data-[state=active]:border-none 
        text-black 
        data-[state=active]:text-[#5B80FD] 
        hover:text-[#5B80FD] 
        relative
        after:content-[''] 
        after:absolute 
        after:bottom-0 
        after:left-1/2 
        after:w-0 
        after:h-0.5 
        after:bg-[#5B80FD] 
        after:transition-all 
        after:duration-300
        data-[state=active]:after:w-0
        hover:after:w-[80%] 
        hover:after:left-[10%]
        data-[state=active]:after:w-[80%] 
        data-[state=active]:after:left-[10%]
    `;
    return (
        <Tabs defaultValue="description">
            <Card className="lg:m-24 m-8">
                <CardHeader className="h-fit">
                    <TabsList className="h-fit bg-white justify-start flex flex-wrap">
                        <TabsTrigger
                            value="description"
                            className={tabsTriggerClasses}
                        >
                            Description
                        </TabsTrigger>
                        <TabsTrigger
                            value="deposit"
                            className={tabsTriggerClasses}
                        >
                            Acompte
                        </TabsTrigger>
                        <TabsTrigger
                            value="bring-device"
                            className={tabsTriggerClasses}
                        >
                            Fournir une console
                        </TabsTrigger>
                        <TabsTrigger
                            value="shipping"
                            className={tabsTriggerClasses}
                        >
                            Délais et expédition
                        </TabsTrigger>
                        <TabsTrigger
                            value="guarantee"
                            className={tabsTriggerClasses}
                        >
                            Garantie
                        </TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                    <TabsContent value="description">
                        <p>
                            {`Chaque console que je propose est moddée à partir de
                    cartes mères officielles restaurées. Les composants
                    neufs tels que l'écran, la coque et les boutons sont
                    neufs, bien que non officiels Nintendo. Cela me
                    permet de garantir des consoles personnalisées de
                    haute qualité, alliant fiabilité et esthétique
                    unique.`}
                        </p>
                    </TabsContent>
                    <TabsContent value="deposit">
                        <p>
                            {`Un acompte de 30 % sera demandé pour confirmer chaque commande, le solde restant sera à régler une fois la console terminé.`}
                        </p>
                    </TabsContent>
                    <TabsContent value="bring-device">
                        <p>
                            {`Vous pouvez me fournir une console fonctionnelle sur laquelle je pourrais travailler. Merci de me contacter directement sur Instagram pour organiser l'expédition de votre console.`}
                        </p>
                    </TabsContent>
                    <TabsContent value="shipping">
                        <p>
                            {`Les consoles sont préparées sur commande, nécessitant jusqu'à 40 jours avant l'expédition. Nous offrons des options d'expédition rapides et fiables : Colissimo, Mondial Relay ou Chronopost Express.`}
                        </p>
                    </TabsContent>
                    <TabsContent value="guarantee">
                        <p>
                            {`Les consoles sont garanties 3 mois. Cependant, nous restons disponible pour toutes réparations ou remplacement si besoin.`}
                        </p>
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
};

export default InfoCard;
