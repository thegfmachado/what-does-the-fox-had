"use client"

import { Skeleton } from "./ui/skeleton";

export function LeafletSkeleton() {
  return (
    <div className="flex gap-4 rounded-md border p-3">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[320px] md:w-[600px]"/>
        <Skeleton className="h-4 w-[250px] md:w-[350px] " />
        <Skeleton className="h-4 w-[250px] md:w-[350px]" />
        <Skeleton className="h-4 w-[250px] md:w-[350px]" />
        <Skeleton className="h-4 w-[300px] md:w-[450px]" />
        <Skeleton className="h-4 w-[300px] md:w-[450px]" />
      </div>
    </div>
  )
}
