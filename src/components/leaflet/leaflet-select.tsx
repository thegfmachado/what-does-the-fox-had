"use client"

import * as React from "react";

import { LeafletType } from "@/app/interfaces/leaflet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Leaflet } from "./leaflet";

type LeafletSelectProps = {
  leaflets: LeafletType[];
  selectedLeaflet?: LeafletType;
}

export function LeafletSelect(props: LeafletSelectProps) {
  const { leaflets } = props

  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const selectedLeaflet = leaflets.find((leaflet) => leaflet.siteName === selectedOption);

  React.useEffect(() => {
    setSelectedOption(leaflets[0]?.siteName || '');
  }, [leaflets]);

  if (!leaflets.length) {
    return null;
  }

  return (
    <div className="w-full min-w-[346px] md:hidden gap-2">
      <Select defaultValue={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="min-w-[280px]">
          <SelectValue placeholder="Selecione uma fonte" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fontes</SelectLabel>
            {leaflets.map((leaflet) => (
              <SelectItem key={leaflet.siteName} value={leaflet.siteName}>{leaflet.siteName}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedLeaflet && <Leaflet {...selectedLeaflet} />}
    </div>
  )
}
