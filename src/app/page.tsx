import type { Metadata } from "next"
import { Approach } from "@/components/sections/Approach"
import { Featured } from "@/components/sections/Featured"
import { FinalCta } from "@/components/sections/FinalCta"
import { Hero } from "@/components/sections/Hero"
import { Intro } from "@/components/sections/Intro"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { ServiceCapabilities } from "@/components/sections/ServiceCapabilities"
import { Services } from "@/components/sections/Services"
import { WhyBrilyx } from "@/components/sections/WhyBrilyx"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <ServiceCapabilities />
      <WhyBrilyx />
      <SelectedWork />
      <Approach />
      <Featured />
      <FinalCta />
    </>
  )
}
