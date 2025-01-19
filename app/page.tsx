"use client";

import Editor from "@/components/editor";
import Header from "@/components/header";
import Wheel from "@/components/wheel";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import { Group, Stack } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [spinning, setSpinning] = useState<boolean>(false);

  return (
    <Stack p="md" className="h-screen">
      <Header />

      <Group justify="center" gap="xl" h="100%">
        <Wheel
          options={options}
          multiplier={multiplier}
          spinning={spinning}
          setSpinning={setSpinning}
        />
        <Editor
          options={options}
          setOptions={setOptions}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          spinning={spinning}
        />
      </Group>
    </Stack>
  );
}
