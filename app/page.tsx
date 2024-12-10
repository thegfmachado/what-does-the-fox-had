"use client"

import * as React from 'react';

import Lottie from "lottie-react";
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import foxAnimation from "@/public/animations/fox.json";

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

  const handleSearch = async () => {
    setLoading(true);

    const leaflet = await getLeaflet(searchWord);
    setLeafletReducerState(leaflet);

    setLoading(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  return (
    <div className="items-center justify-items-center min-h-fit font-[family-name:var(--font-geist-sans)]">
      <main className="w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <header className="w-full flex justify-between items-center">
          <Lottie className="h-[150px]" animationData={foxAnimation} loop={false} />
          <h1 className="text-[2rem] font-bold">What does the fox had? 💊</h1>
        </header>
        <section className="w-full">
          <form className="w-full flex gap-2">
            <Input type="text" placeholder="Informe a droguinha desejada..." onChange={handleInputChange} value={searchWord} />
            <Button variant="outline" type="button" size="icon" onClick={handleSearch}><Search /></Button>
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
