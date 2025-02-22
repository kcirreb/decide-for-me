import {
  ActionIcon,
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface EditorProps {
  options: string[];
  setOptions: (options: string[]) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  spinning: boolean;
}

export default function Editor({
  options,
  setOptions,
  multiplier,
  setMultiplier,
  spinning,
}: EditorProps) {
  const [newOption, setNewOption] = useState<string>("");

  const addOption = () => {
    if (newOption.trim() === "") return;
    setOptions([...options, newOption.trim()]);
    setNewOption("");
  };

  const removeOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const editOption = (index: number, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? value : option,
    );
    setOptions(updatedOptions);
  };

  return (
    <Card radius="md" withBorder className="h-full max-h-80">
      <Group justify="space-between">
        <Text fw={500}>Edit wheel</Text>
        <Group gap="xs">
          <ActionIcon
            variant="default"
            onClick={() => setMultiplier(multiplier - 1)}
            disabled={multiplier === 1}
          >
            <IconMinus stroke={1.5} />
          </ActionIcon>
          <Text>{multiplier}</Text>
          <ActionIcon
            variant="default"
            onClick={() => setMultiplier(multiplier + 1)}
          >
            <IconPlus stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
      <ScrollArea.Autosize h={200} mt="sm">
        <Stack gap="xs">
          {options.map((option, index) => (
            <Group key={index}>
              <TextInput
                value={option}
                onChange={(e) => editOption(index, e.currentTarget.value)}
                disabled={spinning}
              />
              <ActionIcon
                size="input-sm"
                variant="light"
                color="red"
                onClick={() => removeOption(index)}
                disabled={spinning}
              >
                <IconTrash stroke={1.5} />
              </ActionIcon>
            </Group>
          ))}
        </Stack>
      </ScrollArea.Autosize>

      <Group mt="sm">
        <TextInput
          value={newOption}
          placeholder="Add option..."
          onChange={(e) => setNewOption(e.currentTarget.value)}
          disabled={spinning}
        />
        <ActionIcon size="input-sm" onClick={addOption} disabled={spinning}>
          <IconCheck stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
