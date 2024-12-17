import * as React from "react";

import { ScrollArea } from '../ui/scroll-area';
import { LeafletSelect } from "./leaflet-select";
import { LeafletTabs } from "./leaflet-tabs";
import { NotFound } from "../not-found";
import { LeafletSkeleton } from "./leaflet-skeleton";

import type { LeafletType } from "@/app/interfaces/leaflet";

interface LeafletWrapperProps {
  leaflets: LeafletType[];
  loading: boolean;
  searched: boolean;
}

export function LeafletWrapper(props: LeafletWrapperProps) {
  const { leaflets, loading, searched } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      {leaflets.length && !loading ? (
        <ScrollArea className="h-90 w-full md:w-[50%] md:min-w-[650px] rounded-md border font-fira">
          <LeafletSelect leaflets={leaflets} />
          <LeafletTabs leaflets={leaflets} />
        </ScrollArea>
      ) : null}

      {searched && !leaflets.length && !loading ? <NotFound /> : null}

      {loading && <LeafletSkeleton />}
    </div>
  );
};