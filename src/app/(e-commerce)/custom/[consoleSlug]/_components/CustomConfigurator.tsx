import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

interface CustomConfiguratorProps {}

const CustomConfigurator = async (props: CustomConfiguratorProps) => {
    return (
        <div className="flex justify-center bg-[#F8F8F8] py-12">
            <Card className="w-fit mb-12">
                <CardHeader>
                    <CardTitle>Personnalisez votre console</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 h-28">
                        <TriangleAlert className="w-6 h-6" />
                        <p>En cours de développement</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomConfigurator;
