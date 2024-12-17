"use client"

import Image from 'next/image';

import foxImage from "@/../public/images/fox.png";

export function Hero() {
  return (
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
  );
}