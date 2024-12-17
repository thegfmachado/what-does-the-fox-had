"use client"

import { LeafletType } from "@/app/interfaces/leaflet";
import { LeafletItem } from "./leaflet-item";
import { TabsContent } from "./ui/tabs";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type LeafletProps = LeafletType & {
  pdfURL?: string;
};

type LeafletInfoProps = Omit<LeafletProps, 'siteName' | 'pdfURL'>;

export function LeafletInfo(props: LeafletInfoProps) {
  const { activeSubstance, therapeuticClass, title, whatFor, howItWorks } = props;

  return (
    <>
      <div className="p-6 flex justify-center items-center border-b">
        <h4 className="text-md font-medium leading-none">{title}</h4>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {activeSubstance && <LeafletItem label="Princípio Ativo" value={activeSubstance} />}
        {therapeuticClass && <LeafletItem label="Classe Terapêutica" value={therapeuticClass} />}
        {whatFor && <LeafletItem label="Indicado para" value={whatFor} />}
        {howItWorks && <LeafletItem label="Como funciona" value={howItWorks} last />}
      </div>
    </>
  )
}

export function Leaflet(props: LeafletProps) {
  const { activeSubstance, therapeuticClass, title, whatFor, howItWorks, siteName, pdfURL } = props;

  return (
    <TabsContent value={siteName} className="w-full">
      <LeafletInfo
        activeSubstance={activeSubstance}
        therapeuticClass={therapeuticClass}
        title={title}
        whatFor={whatFor}
        howItWorks={howItWorks}
      />
      {siteName === 'ANVISA' && pdfURL ?
        (<div className="flex justify-end items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={pdfURL}
                target="_blank"
              >
                <Button className="m-4 hover:bg-fox active:bg-fox" variant="outline" size="icon">
                  <Download />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baixar bula da ANVISA</p>
            </TooltipContent>
          </Tooltip>
        </div>)
        : null}
    </TabsContent>
  )
}
