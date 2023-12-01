import fs from "fs";

const number_map: any = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};


const extractNumbersRe = (inputString: string): string[] => {
  const re = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g
  return Array.from(inputString.matchAll(re), x => x[1])
};


const convertNumber = (num_str: string): string => {
  const result = number_map[num_str] || undefined;
  if (!result) {
    return num_str;
  }
  return result;
};

const extractNumber = (code: string) => {
  let number = [];
  const rawNumbers = extractNumbersRe(code);
  console.log(rawNumbers);
  if (rawNumbers?.length === 1) {
    const convertedNumber = convertNumber(rawNumbers[0]);
    number = [convertedNumber, convertedNumber];
  } else {
    const convertedNumberFirst = convertNumber(rawNumbers[0]);
    const lastNumberConverted = convertNumber(
      rawNumbers[rawNumbers.length - 1]
    );
    number = [convertedNumberFirst, lastNumberConverted];
  }
  return parseInt(number.join(""));
};

const extractNumbers = (data: string[]) => {
  return data.reduce((acc, curr) => acc + extractNumber(curr), 0);
};

const getValue = (filePath: string):number => {
  const data = fs
  .readFileSync(filePath, {
    encoding: "utf-8",
  })
  .split("\n");
  return extractNumbers(data)

}

console.log(getValue("/Users/edward/code/advent_of_code/src/day_1/input_1.txt"));
