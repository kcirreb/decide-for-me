import { ActionIcon, Group, Stack, TextInput } from "@mantine/core";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface EditorProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

export default function Editor({ options, setOptions }: EditorProps) {
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
      i === index ? value : option
    );
    setOptions(updatedOptions);
  };

  return (
    <Stack>
      {options.map((option, index) => (
        <Group key={index}>
          <TextInput
            value={option}
            onChange={(e) => editOption(index, e.currentTarget.value)}
          />
          <ActionIcon
            size="input-sm"
            variant="light"
            onClick={() => removeOption(index)}
          >
            <IconTrash stroke={1.5} />
          </ActionIcon>
        </Group>
      ))}

      <Group>
        <TextInput
          value={newOption}
          onChange={(e) => setNewOption(e.currentTarget.value)}
        />
        <ActionIcon size="input-sm" onClick={addOption}>
          <IconCheck stroke={1.5} />
        </ActionIcon>
      </Group>
    </Stack>
  );
}
