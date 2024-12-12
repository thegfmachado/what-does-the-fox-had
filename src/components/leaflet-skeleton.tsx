"use client"

import { Skeleton } from "./ui/skeleton";

export function LeafletSkeleton() {
  return (
    <div className="flex gap-4 rounded-md border p-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[300px] max-w-xs" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[300px] max-w-xs" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
        <Skeleton className="h-4 w-full md:w-[250px]" />
      </div>
    </div>
  )
}
