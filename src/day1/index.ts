import { readFileSync } from "node:fs";
import path from "node:path";

const input = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

const groups = lines.reduce((acc, line) => {
  const [group1, group2] = line.split("   ").map(Number);

  return [
    [...acc[0].concat(group1)],
    [...acc[1].concat(group2)]
  ]
}, [[], []] as number[][]);


const sortedGroups = groups.map(group => group.sort((a, b) => a - b));


function result(groups: number[][]) {
  const groupsLength = groups[0].length;
  // part 1
  let diff = 0
  // part 2
  let similarity = 0
  for(let i = 0; i < groupsLength; i++) {
    if(groups[0][i] !== groups[1][i]) {
      diff += Math.abs(groups[0][i] - groups[1][i]);
    }

    similarity += groups[1][i] * groups[0].filter(group => group === groups[1][i]).length
  }

  return {
    diff,
    similarity
  }
}

console.log(result(sortedGroups));
