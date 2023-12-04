import fs from "fs";

const build_starting_obj = (data_length: number): { [key: string]: number } => {
  return Array.from({ length: data_length }, (_, i) => `${i + 1}`).reduce(
    (acc, key) => {
      acc[key] = 1;
      return acc;
    },
    {} as { [key: string]: number }
  );
};

const handleScore = (result_str: string): number => {
  const [_, result] = result_str.split(":");
  console.log(result);
  const [winning, points] = result.split("|");
  const win_set = winning
    .trim()
    .split(" ")
    .filter((x) => x);
  const result_set = points
    .trim()
    .split(" ")
    .filter((x) => x && win_set.includes(x));
  return result_set.length;
};

const main = (filePath: string): number => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" }).split("\n");
  const counter = build_starting_obj(data.length);
  console.log(counter);
  data.forEach((card, i) => {
    const card_num = i + 1;
    const curr_card_count = counter[card_num.toString()];
    const number_of_matches = handleScore(card);
    for (let j = card_num + 1; j < card_num + 1 + number_of_matches; j++) {
      counter[j.toString()] += curr_card_count;
    }
  });
  return Object.values(counter).reduce((acc, curr) => acc + curr, 0);
};

console.log(main("/Users/edward/code/advent_of_code/src/day_4/input_1.txt"));
