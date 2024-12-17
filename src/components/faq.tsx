"use client"

import * as React from "react";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { SOURCES } from "@/constants/dictionaries";

export function FAQ() {
  return (
    <div className="mt-28 flex flex-col gap-4 w-full md:w-1/3">
      <p className="md:text-md font-medium text-center">Perguntas frequentes</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm">Posso confiar nessas informações?</AccordionTrigger>
          <AccordionContent>
            <div className="mb-2 text-sm">
              Sim, este site apenas mostra informações obtidas através de fontes oficiais como a ANVISA entre outras. Cheque todas as fontes abaixo:
            </div>
            <div>
              {Object.values(SOURCES).map((source, index, array) => (
                <React.Fragment key={source.url}>
                  <Link
                    className="font-medium underline underline-offset-4"
                    href={source.url}
                    target="_blank"
                  >
                    {source.name}
                    {index < array.length - 1 && ", "}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm">Como essas informações são obtidas?</AccordionTrigger>
          <AccordionContent>
            <span className="mb-2 text-sm">
              A partir de técnicas de web scraping e APIs, buscamos informações em sites oficiais e confiáveis para trazer a você a melhor experiência possível.
            </span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

