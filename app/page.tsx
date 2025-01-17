"use client";

import Editor from "@/components/editor";
import Wheel from "@/components/wheel";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import { Group } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS);
  const [spinning, setSpinning] = useState<boolean>(false);

  return (
    <Group justify="center" gap="xl" className="h-screen">
      <Wheel options={options} spinning={spinning} setSpinning={setSpinning} />
      <Editor options={options} setOptions={setOptions} spinning={spinning} />
    </Group>
  );
}
