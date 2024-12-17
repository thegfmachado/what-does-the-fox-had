"use client"

import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeProvider } from 'next-themes';

import { Search } from 'lucide-react';

import { ANVISALeafletType } from './interfaces/anvisa';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeModeToggle } from '@/components/theme/theme-mode-switcher';
import { Separator } from '@/components/ui/separator';
import { LeafletSkeleton } from '@/components/leaflet-skeleton';
import { Leaflet, LeafletInfo } from '@/components/leaflet';
import { LeafletType } from './interfaces/leaflet';
import { NotFound } from '@/components/not-found';

import foxImage from "@/../public/images/fox.png";

async function getScrappingLeaflets(medicineName: string): Promise<LeafletType[]> {
  const response = await fetch("/api/leaflet/scrapping", {
    method: "POST",
    body: JSON.stringify({
      medicineName,
    }),
  });

  return await response.json();
}

async function getANVISALeaflet(medicineName: string): Promise<ANVISALeafletType> {
  const response = await fetch(`/api/leaflet/anvisa?medicine=${medicineName}`);

  return await response.json();
}

const year = new Date().getFullYear();

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searched, setSearched] = React.useState<boolean>(false);
  const [searchWord, setSearchWord] = React.useState<string>('');
  const [leaflets, setLeaflets] = React.useState<LeafletType[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<string>('');

  const selectedLeaflet = leaflets.find((leaflet) => leaflet.siteName === selectedOption);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setLeaflets([]);

    try {
      const [scrappingLeaflets, anvisaLeaflet] = await Promise.all([
        getScrappingLeaflets(searchWord),

        // Catching error to avoid breaking the Promise.all since the ANVISA API is not reliable
        getANVISALeaflet(searchWord).catch((error) => {
          console.error("Failed to fetch ANVISA leaflet:", error);
          return null;
        }),
      ]);

      setLeaflets(anvisaLeaflet ? [...scrappingLeaflets, anvisaLeaflet] : scrappingLeaflets);
      setSelectedOption(scrappingLeaflets[0].siteName);

    } catch (error) {
      console.error("Error during search:", error);
      setLeaflets([]);
      setSelectedOption('');

    } finally {
      setLoading(false);

      if (!searched) {
        setSearched(true);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="antialiased p-4 md:p-8 pb-1 flex flex-col gap-8 min-h-screen">
          <div className="flex flex-col items-center justify-items-center min-h-fit gap-8 font-inter">
            <header className="w-full">
              <div className="w-full flex justify-end">
                <ThemeModeToggle />
              </div>
            </header>
            <main className="w-full flex flex-col gap-8 row-start-2 justify-center items-center">
              <section className="w-full">
                <div className="flex flex-col justify-center items-center">
                  <Image className="h-[128px] w-[128px]" src={foxImage} alt="fox logo" />
                  <h1 className="font-extrabold tracking-tight mt-6 text-2xl sm:text-3xl md:text-4xl">
                    What does the <span className="text-fox">fox</span> had? 💊
                  </h1>
                  <div className="flex flex-col items-center justify-center text-center mt-6 gap-2 sm:leading-6 sm:text-lg md:leading-7 md:text-xl">
                    <p>
                      Quantas vezes você já achou um remédio aleatório perdido no fundo da gaveta e pensou: <span className="text-fox font-extrabold">&quot;Pra que raios serve isso?&quot;</span>
                    </p>
                    <p>
                      Descubra os detalhes do remédio pesquisando pelo nome que consta na embalagem.
                    </p>
                  </div>
                </div>
              </section>
              <section className="w-full flex justify-center">
                <form className="flex gap-2 w-full md:w-1/3 md:min-w-[650px]" onSubmit={handleSearch}>
                  <Input className="text-sm md:text-base" type="text" placeholder="Informe o medicamento desejado..." onChange={handleInputChange} value={searchWord} />
                  <Button className="hover:bg-fox active:bg-fox" variant="outline" type="submit" size="icon" disabled={loading || !searchWord.length}><Search /></Button>
                </form>
              </section>
              <section className="w-full flex justify-center">
                <div className="flex flex-col items-center justify-center">
                  {
                    leaflets.length && !loading ? (
                      <>
                        <div className="w-full min-w-[346px] md:hidden gap-2">
                          <Select defaultValue={selectedOption} onValueChange={setSelectedOption}>
                            <SelectTrigger className="min-w-[280px]">
                              <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Fontes</SelectLabel>
                                {leaflets.map((leaflet) => (
                                  <SelectItem key={leaflet.siteName} value={leaflet.siteName}>{leaflet.siteName}</SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <ScrollArea className="h-90 w-full md:min-w-[650px] md:w-1/3 rounded-md border font-fira">
                          <Tabs className="hidden sm:block" defaultValue={leaflets[0].siteName}>
                            <TabsList className={`grid w-full grid-cols-${leaflets.length}`}>
                              {leaflets.map((leaflet) => (
                                <TabsTrigger className="data-[state=active]:bg-fox" key={leaflet.siteName} value={leaflet.siteName}>{leaflet.siteName}</TabsTrigger>
                              ))}
                            </TabsList>
                            <div className="flex w-full justify-center gap-2">
                              {leaflets.map((leaflet) => (
                                <Leaflet key={leaflet.siteName} {...leaflet} />
                              ))}
                            </div>
                          </Tabs>
                          <div className="w-full min-w-[346px] md:hidden gap-2">
                            {selectedLeaflet && <LeafletInfo {...selectedLeaflet} />}
                          </div>
                        </ScrollArea>
                      </>
                    ) : null
                  }

                  {searched && !leaflets.length && !loading ? (
                    <NotFound />
                  ) : null}

                  {loading && (
                    <LeafletSkeleton />
                  )}
                </div>
              </section>
            </main>
          </div>
          <footer className="grow flex justify-center items-end">
            <div className="flex flex-col justify-center items-center gap-4 mb-2">
              <div>
                Made with <span>❤️</span> and <span>☕</span>
              </div>
              <div className="flex h-6 items-center space-x-4">
                <Link
                  className="flex justify-center items-center gap-2 text-lg font-handjet hover:font-bold hover:text-violet-600 active:text-violet-700"
                  href="https://github.com/thegfmachado"
                  target="_blank"
                >{`<gfm />`}
                </Link>
                <Separator orientation="vertical" />
                <span>© {year}</span>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
