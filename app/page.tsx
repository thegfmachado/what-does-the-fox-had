"use client"

import * as React from 'react';

import Image from 'next/image';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeModeToggle } from '@/components/theme/theme-mode-switcher';
import { Separator } from '@/components/ui/separator';

import foxImage from "@/public/images/fox.png";
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { LeafletSkeleton } from '@/components/leaflet-skeleton';
import { Leaflet } from '@/components/leaflet';
import { LeafletType } from './interfaces/leaflet';

async function getLeaflet(word: string) {
  const response = await fetch("/api/leaflet", {
    method: "POST",
    body: JSON.stringify({
      word: word,
    }),
  });

  return await response.json();
}

const reducerInitialState = {
  activeSubstance: '',
  therapeuticClass: '',
  title: '',
  whatFor: '',
  howItWorks: '',
}

function leafletReducer(data: LeafletType, partialData: Partial<LeafletType>): LeafletType {
  return {
    ...data,
    ...partialData,
  };
}

const year = new Date().getFullYear();

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searched, setSearched] = React.useState<boolean>(false);
  const [searchWord, setSearchWord] = React.useState<string>('');
  const [leafletReducerState, setLeafletReducerState] = React.useReducer(leafletReducer, reducerInitialState);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const leaflet = await getLeaflet(searchWord);
    setLeafletReducerState(leaflet);

    setLoading(false);

    if (!searched) {
      setSearched(true);
    }
  }

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
      <div className="flex flex-col items-center justify-items-center min-h-fit gap-8 font-[family-name:var(--font-geist-sans)]">
        <header className="w-full">
          <div className="w-full flex justify-end">
            <ThemeModeToggle />
          </div>
        </header>
        <main className="w-full flex flex-col gap-8 row-start-2 justify-center items-center">
          <section className="w-full">
            <div className="flex flex-col justify-center items-center">
              <Image className="h-[128px] w-[128px]" src={foxImage} alt="fox logo" />
              <h1 className="font-extrabold tracking-tight lg:text-4xl mt-6">
                What does the <span className="text-[#f97316]">fox</span> had? 💊
              </h1>
              <p className="leading-7 mt-6 lg:text-xl">
                Quantas vezes você já achou um remédio aleatório perdido no fundo da gaveta e pensou: <span className="text-[#f97316] font-extrabold">&quot;Pra que raios serve isso?&quot;</span>
              </p>
              <p className="leading-7 lg:text-xl">
                Descubra os detalhes do remédio pesquisando pelo nome que consta na embalagem.
              </p>
            </div>
          </section>
          <section className="w-full flex justify-center">
            <form className="flex gap-2 w-1/3" onSubmit={handleSearch}>
              <Input type="text" placeholder="Informe o medicamento desejado..." onChange={handleInputChange} value={searchWord} />
              <Button variant="outline" type="submit" size="icon" disabled={loading || !searchWord.length}><Search /></Button>
            </form>
          </section>
          <section className="w-full flex justify-center">
            <div className="flex justify-center w-1/3">
              {leafletReducerState.title && !loading && (
                <Leaflet {...leafletReducerState} source="Consulta Remédios" />
              )}

              {searched && !leafletReducerState.title && !loading && (
                <div className="flex items-center pt-16 px-4">
                  <div className="w-full space-y-6 text-center">
                    <div className="space-y-3">
                      <p className="text-4xl font-bold tracking-tighter">Oops! A raposa não achou nada</p>
                      <p className="text-lg text-gray-500">Cuidado com esse seu remedinho desconhecido heinn 🤨👀.</p>
                    </div>
                  </div>
                </div>
              )}

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
              className="flex justify-center items-center gap-2 text-lg font-[family-name:var(--font-handjet)] hover:font-bold hover:text-violet-600 active:text-violet-700"
              href="https://github.com/thegfmachado"
              target="_blank"
            >{`<gfm />`}
            </Link>
            <Separator orientation="vertical" />
            <span>© {year}</span>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}
