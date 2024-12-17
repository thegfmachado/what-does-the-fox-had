"use client"

import { LeafletType } from "@/app/interfaces/leaflet";
import { LeafletItem } from "./leaflet-item";
import { LeafletDownloadButton } from "./leaflet-download-button";

type LeafletProps = LeafletType & {
  pdfURL?: string;
};

export function Leaflet(props: LeafletProps) {
  const { activeSubstance, therapeuticClass, title, whatFor, howItWorks, siteName, pdfURL } = props;

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

        {siteName === 'ANVISA' ?
          (
            <div className="flex justify-end items-center">
              <LeafletDownloadButton pdfURL={pdfURL} />
            </div>
          )
          : null}
      </div>
    </>
  );
}
