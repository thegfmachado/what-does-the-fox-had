"use client"

import * as React from 'react';

import { LeafletType } from "@/app/interfaces/leaflet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Leaflet } from "./leaflet";

type LeafletTabsProps = {
  leaflets: LeafletType[];
  selectedLeaflet?: LeafletType;
}

export function LeafletTabs(props: LeafletTabsProps) {
  const { leaflets } = props

  if (!leaflets.length) {
    return null;
  }

  const tabElements = leaflets.map((leaflet) => ({
    trigger: (
      <TabsTrigger
        className="data-[state=active]:bg-fox flex-1"
        key={`trigger-${leaflet.siteName}`}
        value={leaflet.siteName}
      >
        {leaflet.siteName}
      </TabsTrigger>
    ),
    content: (
      <TabsContent
        key={`content-${leaflet.siteName}`}
        value={leaflet.siteName}
        className="w-full"
      >
        <Leaflet {...leaflet} />
      </TabsContent>
    ),
  }));

  return (
    <Tabs className="hidden md:block" defaultValue={leaflets[0].siteName}>
      <TabsList className="w-full flex gap-2">
        {tabElements.map((element) => element.trigger)}
      </TabsList>
      <div className="flex w-full justify-center gap-2">
        {tabElements.map((element) => element.content)}
      </div>
    </Tabs>
  );
}
