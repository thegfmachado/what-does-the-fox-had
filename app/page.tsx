"use client"

import * as React from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import foxImage from "@/public/images/fox.png";
import Image from 'next/image';

type LeafletReducerState = {
  activeSubstance: string;
  therapeuticClass: string;
  title: string;
}

async function getLeaflet(word: string) {
  const response = await fetch("/api/search", {
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
}

function leafletReducer(data: LeafletReducerState, partialData: Partial<LeafletReducerState>): LeafletReducerState {
  return {
    ...data,
    ...partialData,
  };
}

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchWord, setSearchWord] = React.useState<string>('');
  const [leafletReducerState, setLeafletReducerState] = React.useReducer(leafletReducer, reducerInitialState);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const leaflet = await getLeaflet(searchWord);
    setLeafletReducerState(leaflet);

    setLoading(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-fit gap-8 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-between items-center">
        <Image className="h-[96px] w-[96px]" src={foxImage} alt="fox logo" />
        <h1 className="text-[2rem] justify-self-end font-bold ml-auto">What does the fox had? 💊</h1>
      </header>
      <main className="w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="w-full">
          <form className="w-full flex gap-2" onSubmit={handleSearch}>
            <Input type="text" placeholder="Informe o medicamento desejado..." onChange={handleInputChange} value={searchWord} />
            <Button variant="outline" type="submit" size="icon" disabled={loading || !searchWord.length}><Search /></Button>
          </form>
        </section>
        {!loading ? <section className="w-full flex flex-col gap-2 justify-center">
          <div>{leafletReducerState.title}</div>
          <div>{leafletReducerState.activeSubstance}</div>
          <div>{leafletReducerState.therapeuticClass}</div>
        </section> : <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>}
      </main>
    </div>
  );
}
