import fs from "fs"


const replaceData = (data: string):number => {
    return Number(data.split(":")[1].trim().replace(/\s+/g, ""))
}

//found out minimum to win the race then calculate the difference
const calculateRecordBeater = (raceTime: number, recordDist: number): number => {
    let minRecord = Number.POSITIVE_INFINITY
    for (let i = 1; i < raceTime; i++) {
        const dist = i * (raceTime - i) 
        if (dist > recordDist) {
            minRecord = i
            break
        }
    }
    const upper = raceTime - minRecord
    return upper - minRecord + 1

}

const main = (filePath: string): number => {
    const data = fs.readFileSync(filePath, {encoding: "utf-8"}).split("\n")
    const [time, distance] = data.map(replaceData)
    return calculateRecordBeater(time, distance)
}

console.log(main("day_6/input.txt"))
