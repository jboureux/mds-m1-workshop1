"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVariantDialog } from "@/hooks/variant-dialog-provider";
import { Category } from "@/models/category.model";
import { AlertCircle, Plus } from "lucide-react";
import AccessoryCardVariantRow from "./AccessoryCardVariantRow";
import AccessorySettings from "./AccessorySettings";

interface AccesoryListProps {
  category: Category;
}

const AccesoryList = (props: AccesoryListProps) => {
  if (!props.category.accessories) throw new Error("No accessories");

  const { openCreate } = useVariantDialog();

  const baseCount = props.category.accessories.filter(
    (value) => value.isBase
  ).length;
  return (
    <>
      {baseCount != 1 && (
        <div className="w-full flex justify-center my-4">
          <Alert variant={"destructive"} className="w-[50%]">
            <AlertCircle />
            <AlertTitle>Nombre de bases incorrect</AlertTitle>
            <AlertDescription>{`Le personnaliseur est conçu pour n'avoir qu'une base. Il se peut que ce dernier ne fonctionne pas correctement, veuillez modifier vos accessoires.`}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="flex flex-wrap overflow-hidden w-full justify-center gap-6 mt-6">
        {props.category.accessories.map((accessory) => {
          return (
            <Card key={accessory._id} className="min-w-[350px]">
              <CardHeader>
                <CardTitle className="flex justify-between h-fit">
                  <span>
                    {accessory.name}
                    {accessory.isBase && (
                      <Badge variant={"outline"} className="ml-2">
                        Base
                      </Badge>
                    )}
                  </span>
                  <AccessorySettings
                    accessory={accessory}
                    categoryId={props.category.id}
                  />
                </CardTitle>
                <CardDescription>{accessory.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {accessory.variants &&
                  accessory.variants.map((variant) => {
                    return (
                      <AccessoryCardVariantRow
                        key={variant.id}
                        variant={variant}
                      />
                    );
                  })}
                <Button
                  variant={"outline"}
                  onClick={() => {
                    openCreate(accessory._id);
                  }}
                >
                  <Plus className="w-6 h-6 mr-2" />
                  Ajouter une variante
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default AccesoryList;
