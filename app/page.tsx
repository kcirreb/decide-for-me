"use client";

import Editor from "@/components/editor";
import Wheel from "@/components/wheel";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import {
  ActionIcon,
  Group,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrandGithubFilled, IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [options, setOptions] = useState<string[]>(DEFAULT_OPTIONS);
  const [spinning, setSpinning] = useState<boolean>(false);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <Stack p="md" className="h-screen">
      <Group justify="space-between">
        <Text size="lg" fw={500}>
          🎡 Decide for Me
        </Text>
        <Group gap="xs">
          <ActionIcon
            component="a"
            href="https://github.com/kcirreb/decide-for-me"
            target="_blank"
            variant="default"
            size="lg"
            radius="md"
          >
            <IconBrandGithubFilled size={22} />
          </ActionIcon>
          <ActionIcon
            onClick={toggleColorScheme}
            variant="default"
            size="lg"
            radius="md"
          >
            {computedColorScheme === "light" ? (
              <IconMoon size={22} stroke={1.5} />
            ) : (
              <IconSun size={22} stroke={1.5} />
            )}
          </ActionIcon>
        </Group>
      </Group>

      <Group justify="center" gap="xl" h="100%">
        <Wheel
          options={options}
          spinning={spinning}
          setSpinning={setSpinning}
        />
        <Editor options={options} setOptions={setOptions} spinning={spinning} />
      </Group>
    </Stack>
  );
}
