"use client"
import * as React from "react"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const links = [
  {
    image: 'https://www.doubleup.fun/Diamond_Only.png',
    url: 'https://www.doubleup.fun',
    title: 'doubleup',
    description: 'a somewhat fair casino'
  },
  {
    image: 'https://forkast.news/wp-content/uploads/2023/10/Sui-network-768x402.png',
    url: 'https://sui.io/',
    title: 'sui',
    description: 'the official homepage for sui'
  },
  {
    image: 'https://legacy.bucketprotocol.io/_next/static/media/bucket-app-og-image.b812ddb5.png',
    url: 'https://www.bucketprotocol.io/',
    title: 'bucketprotocol',
    description: 'some coin thingy'
  },
  {
    image: 'https://egamers.io/wp-content/uploads/2024/09/Scallop-Launches-Big-Airdrop-and-Staking-Campaign-1600x900.jpg',
    url: 'https://app.scallop.io/',
    title: 'scallop',
    description: 'some exchange'
  },
  {
    image: 'https://sui.directory/wp-content/uploads/2023/04/Cetus-1000x600-1.png',
    url: 'https://app.cetus.zone/',
    title: 'cetus',
    description: 'some exchange'
  },
  {
    image: 'https://cryptoinno.net/wp-content/uploads/2024/05/Toi-gui-tien-vao-Suilend.png',
    url: 'https://suilend.fi/',
    title: 'suilend',
    description: 'some exchange'
  },
  {
    image: 'https://suipiens.com/blog/content/images/2023/03/what-is-aftermath-finance-1.png',
    url: 'https://aftermath.finance/',
    title: 'aftermath',
    description: 'some exchange'
  },
]

function CarouselSize({setCurrentLink}:{setCurrentLink: any}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-xs sm:max-w-full"
    >
      <CarouselContent>
        {[...links, ...links].map((link, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/12" onClick={() => setCurrentLink(link)}>
            <div className="p-1">
              <Card className="transition-all hover:scale-[115%] cursor-pointer">
                <CardContent
                 className="flex aspect-[9/16] items-center justify-center p-6"
                  style={{
                    background: `url(${link.image}) no-repeat center center fixed`,
                    backgroundSize: 'cover',
                  }}>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}


export default function Home() {
  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <>
      <head>
        <title>suicentral</title>
        <meta name="description" content="A collection of top apps on the SUI ecosystem." />
        <meta property="og:title" content="suicentral" />
        <meta property="og:description" content="A collection of top apps on the SUI ecosystem." />
        <meta name="robots" content="all" />
      </head>
      <div className="relative grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <img className="absolute h-full w-full object-cover -z-[1]" src={currentLink.image}/>
        <div className="absolute bg-gradient-to-b sm:bg-gradient-to-r from-neutral-950 to-60% sm:to-40% h-full w-full object-cover -z-[1]" />
        <header className="justify-self-start text-white">
          <h1 className="text-[50px] font-bold text-white">suicentral</h1>
        </header>
        <div className="grid justify-self-start text-white">
          <h2 className="font-semibold">{currentLink.title}</h2>
          <div>
          <a href={currentLink.url}>{currentLink.url} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 -translate-y-[3px] inline-block">
    <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" />
  </svg> </a>
          </div>
          <span>{currentLink.description}</span>
        </div>
        <CarouselSize setCurrentLink={setCurrentLink}/>
      </div>
    </>
  );

}
