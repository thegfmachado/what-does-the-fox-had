"use client"

import * as React from 'react';

import Link from 'next/link';
import { ThemeProvider } from 'next-themes';

//@ts-expect-error -- bulario is not typed
import bulario from 'bulario';

import { Search } from 'lucide-react';

import { ANVISALeafletType } from './interfaces/anvisa';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeModeToggle } from '@/components/theme/theme-mode-switcher';
import { Separator } from '@/components/ui/separator';
import { LeafletType } from './interfaces/leaflet';
import { Hero } from '@/components/hero';
import { LeafletWrapper } from '@/components/leaflet/leaflet-wrapper';
import { FAQ } from '@/components/faq';

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
  const busca = await bulario.pesquisar(medicineName)
  console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)

  const response = await fetch(`/api/leaflet/anvisa?medicine=${medicineName}`);

  return await response.json();
}

const year = new Date().getFullYear();

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searched, setSearched] = React.useState<boolean>(false);
  const [searchWord, setSearchWord] = React.useState<string>('');
  const [leaflets, setLeaflets] = React.useState<LeafletType[]>([]);

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

    } catch (error) {
      console.error("Error during search:", error);
      setLeaflets([]);

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
        <div className="antialiased p-4 md:p-8 pb-1 flex flex-col gap-8 min-h-screen font-inter">
          <header className="w-full">
            <div className="w-full flex justify-end">
              <ThemeModeToggle />
            </div>
          </header>
          <main className="grow w-full flex flex-col gap-8 row-start-2 justify-center items-center">
            <section className="w-full">
              <Hero />
            </section>
            <section className="w-full flex justify-center">
              <form className="flex gap-2 w-full md:w-2/3 md:min-w-[650px]" onSubmit={handleSearch}>
                <Input className="text-sm md:text-base" type="text" placeholder="Ex: dipirona" onChange={handleInputChange} value={searchWord} />
                <Button className="hover:bg-fox active:bg-fox" variant="outline" type="submit" size="icon" disabled={loading || !searchWord.length}><Search /></Button>
              </form>
            </section>
            <section className="grow w-full flex flex-col items-center justify-end">
              <LeafletWrapper leaflets={leaflets} loading={loading} searched={searched} />
              <FAQ />
            </section>
          </main>
          <footer className="flex justify-center items-end">
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
