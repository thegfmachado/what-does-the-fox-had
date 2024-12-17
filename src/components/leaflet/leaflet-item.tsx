"use client"

import * as React from "react"

import { Separator } from "../ui/separator";

type LeafletItemProps = {
  label?: string;
  last?: boolean;
  value: string;
}

export function LeafletItem(props: LeafletItemProps) {
  const { last, label, value } = props;

  return (
    <div>
      {label && <span className="text-sm font-bold">{label ? `${label}: ` : label}</span>}
      <span className="text-sm">{value}</span>
      {!last && <Separator className="my-2" />}
    </div>
  )
}
