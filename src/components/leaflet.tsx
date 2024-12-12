"use client"

import { LeafletType } from "@/app/interfaces/leaflet";
import { LeafletItem } from "./leaflet-item";
import { ScrollArea } from "./ui/scroll-area";

type LeafletProps = LeafletType & {
  source: string;
};

export function Leaflet(props: LeafletProps) {
  const { activeSubstance, therapeuticClass, title, whatFor, howItWorks, source } = props;

  return (
    <ScrollArea className="h-80 md:w-2/3 max-w-2xl rounded-md border font-fira">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Fonte: {source}</h4>
        <div className="flex flex-col gap-1">
          {title && <LeafletItem title={title} />}
          {activeSubstance && <LeafletItem title={activeSubstance} />}
          {therapeuticClass && <LeafletItem title={therapeuticClass} />}
          {whatFor && <LeafletItem title={whatFor} />}
          {howItWorks && <LeafletItem title={howItWorks} />}
        </div>
      </div>
    </ScrollArea>
  )
}
