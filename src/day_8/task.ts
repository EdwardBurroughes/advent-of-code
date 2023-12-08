import fs from 'fs';

const data = fs.readFileSync("src/day_8/input.txt", {encoding: "utf-8"})
const dataSplit = data.split("\n")
const instructions = dataSplit[0] + dataSplit[1]
const camelMap = dataSplit.slice(2)


type CamelMap = {
    [key: string]:{[key: string]: string}
}

const camelMapObj: CamelMap = {}
camelMap.forEach((x) => {
   const [key, res] = x.split(" = ")
   const [left, right] = res.split(",")
   const leftSub = left.substring(1)
   const rightSub = right.substring(1,right.length-1)
   camelMapObj[key] = {L: leftSub, R: rightSub}
})

//[ 'GNA', 'FCA', 'AAA', 'MXA', 'VVA', 'XHA' ]

const AValues = Object.keys(camelMapObj).filter(x => x.endsWith('A'))


const getNumberOfSteps = (startKey: string): number => {
    let found = false;
    let curr = startKey;
    let counter = 0;
    while (!found) {
        for (let i = 0; i < instructions.length; i++) {
            const dir = instructions[i];
            if (!curr.endsWith("Z")) {
                curr = camelMapObj[curr][dir];
                counter++;
            } else {
                found = true;
            }
        }
    }
    return counter;
}
const steps = AValues.map(x => getNumberOfSteps(x)).sort();
const greatestCommonDivisor = (a: number, b: number): number => {
    const remainder = a % b;
    if (remainder === 0) return b;
    return greatestCommonDivisor(b, remainder);
  };
  
const leastCommonMultiple = (arr: number[]) =>{ 
      let ans = arr[0]; 
      for (let i = 1; i < arr.length; i++) 
          ans = (((arr[i] * ans)) / 
                  (greatestCommonDivisor(arr[i], ans))); 
      return ans; 
  } 

console.log(leastCommonMultiple(steps))


