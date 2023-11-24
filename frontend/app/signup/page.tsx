import React from "react";
import Image from "next/image";

import Bg from "@/public/bg.jpg";
import { SignUpForm } from "./components/sign-up-form";

export default function Home() {
  return (
    <div className="flex h-screen overflow-clip dark:bg-zinc-950 max-md:flex-col">
      <div className="w-1/2 bg-cover max-md:hidden">
        <Image src={Bg} className="h-full object-cover" alt={"Background"} />
      </div>
      <SignUpForm />
    </div>
  )
}
