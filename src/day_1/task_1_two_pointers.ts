import fs from 'fs'

const number_map: { [key: string]: string } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  
  const isDigit = (num_str: string): boolean => {
    return !isNaN(Number(num_str));
  };
  
  const findNumber = (num_str: string): RegExpMatchArray | null => {
    const numbersPat = Object.keys(number_map).join("|");
    const re = new RegExp(`${numbersPat}`, "g");
    const matches = num_str.match(re);
    return matches;
  };
  
  const checkForNumStr = (firstWord: string, firstValue: string): string => {
    const res = findNumber(firstWord);
    if (res?.length) {
      firstValue = number_map[res[0]];
    }
    return firstValue;
  };

  
  const twoPointerVersion = (code: string): any => {
    let firstValue = "";
    let lastValue = "";
    let firstWord = "";
    let lastWord = "";
    for (let i = 0, j = code.length - 1; i < code.length; i++, j--) {
      if (lastValue && firstValue) {
        return parseInt(firstValue + lastValue);
      }
  
      // handle first point
      if (isDigit(code[i]) && !firstValue) {
        firstValue = code[i];
      } else {
        if (!firstValue) {
          firstWord += code[i];
          firstValue = checkForNumStr(firstWord, firstValue);
        }
      }
  
      // handle last pointer
      if (isDigit(code[j]) && !lastValue) {
        lastValue = code[j];
      } else {
        if (!lastValue) {
          lastWord = code[j] + lastWord;
          lastValue = checkForNumStr(lastWord, lastValue);
        }
      }
    }
    return parseInt(firstValue + lastValue)
  };
  
  const extractNumbers = (data: string[]) => {
    return data.reduce((acc, curr) => acc + twoPointerVersion(curr), 0);
  };
  
  
  const getValue = (filePath: string) => {
    const data = fs
    .readFileSync(filePath, {
      encoding: "utf-8",
    })
    .split("\n");
    return extractNumbers(data)
  }
  
  console.log(getValue("src/day_1/input_1.txt"));