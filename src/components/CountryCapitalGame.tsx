import { useState } from "react";
import styles from "./CountryCapitalGame.module.css";

interface CountryCapitalGameProps {
  // each key is a country and the value is a capital
  data: Record<string, string>;
}

type Option = {
  value: string;
  state: "default" | "selected" | "incorrect";
};

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
  const [options, setOptions] = useState<Option[]>(
    objectToRandomArray(data).map((item) => ({ value: item, state: "default" }))
  );

  const [selected, setSelected] = useState<string>();

  const buttonClickHandler = (opt: Option) => {
    if (!selected) {
      setOptions(
        options.map((item) => {
          return {
            ...item,
            state: item.value === opt.value ? "selected" : "default",
          };
        })
      );
      setSelected(opt.value);
    } else if (
      data[selected ?? ""] === opt.value ||
      selected === data[opt.value]
    ) {
      setOptions(
        options.filter((item) => {
          return !(item.value === opt.value || item.value === selected);
        })
      );
      setSelected(undefined);
    } else {
      setOptions(
        options.map((item) => {
          return item.value === opt.value || item.value === selected
            ? { ...item, state: "incorrect" }
            : item;
        })
      );
      setSelected(undefined);
    }
  };

  return (
    <div>
      {options.map((opt) => {
        return (
          <button
            key={opt.value}
            onClick={() => buttonClickHandler(opt)}
            className={styles[opt.state]}
          >
            {opt.value}
          </button>
        );
      })}
      {options.length === 0 && <p>Congratulations!</p>}
    </div>
  );
}

function objectToRandomArray(obj: { [key: string]: string }): string[] {
  const resultArray = [...Object.values(obj), ...Object.keys(obj)];

  shuffleArray(resultArray);

  return resultArray;
}

function shuffleArray(arr: string[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
