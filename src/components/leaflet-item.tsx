"use client"

import * as React from "react"

import { Separator } from "@radix-ui/react-separator"

type LeafletItemProps = {
  title: string;
}

export function LeafletItem(props: LeafletItemProps) {
  const { title } = props;

  return (
    <div>
      <Separator className="my-2" />
      <span className="text-sm">{title}</span>
    </div>
  )
}
