"use client"

import { Download } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type LeafletItemProps = {
  pdfURL?: string;
}

export function LeafletDownloadButton(props: LeafletItemProps) {
  const { pdfURL } = props;

  if (!pdfURL) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={pdfURL}
          target="_blank"
        >
          <Button className="m-4 hover:bg-fox active:bg-fox" variant="outline" size="icon">
            <Download />
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Baixar bula da ANVISA</p>
      </TooltipContent>
    </Tooltip>
  )
}
