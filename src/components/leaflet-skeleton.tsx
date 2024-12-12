"use client"

import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export function LeafletSkeleton() {
  return (
    <ScrollArea className="rounded-md border p-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[400px] max-w-xs" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
      </div>
    </ScrollArea>
  )
}
