"use client"

import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export function LeafletSkeleton() {
  return (
    <ScrollArea className="rounded-md border font-[family-name:var(--font-fira)]">
      <div className="flex flex-col gap-1 p-4">
        <Skeleton className="h-4 w-[400px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </ScrollArea>
  )
}
