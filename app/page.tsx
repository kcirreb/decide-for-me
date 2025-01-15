"use client";

import Editor from "@/components/editor";
import Wheel from "@/components/wheel";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS);

  return (
    <div className="flex items-center justify-center h-screen gap-8">
      <Wheel options={options} />
      <Editor options={options} setOptions={setOptions} />
    </div>
  );
}
