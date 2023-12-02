import fs from "fs";

type Result = {
  [key: string]: number;
};

const convertResults = (gameResult: string): [number, string][] => {
  return gameResult.split(/,|;/g).map((res) => {
    const [count, color] = res.trim().split(" ");
    return [parseInt(count), color];
  });
};

const getMaxResults = (result: [number, string][]): Result => {
  const maxValues: Result = {};
  result.forEach(([count, color]) => {
    if (!maxValues[color] || count > maxValues[color]) {
      maxValues[color] = count;
    }
  });
  return maxValues;
};

const parseGame = (gameStr: string): number => {
  const [_, gameResult] = gameStr.split(":");
  const result = convertResults(gameResult);
  const maxValues = getMaxResults(result);
  return Object.values(maxValues).reduce((acc, curr) => acc * curr);
};

const checkGame = (data: string[]): number => {
  return data.reduce((acc, curr) => acc + parseGame(curr), 0);
};

const main = (filePath: string): number => {
  const data = fs.readFileSync(filePath, {encoding: "utf-8"}).split("\n")
  return checkGame(data);
};

console.log(main("/Users/edward/code/advent_of_code/src/day_2/input_1.txt"))
