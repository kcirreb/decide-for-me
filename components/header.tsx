import {
  ActionIcon,
  Group,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconBrandGithubFilled, IconMoon, IconSun } from "@tabler/icons-react";

export default function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
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
  );
}
