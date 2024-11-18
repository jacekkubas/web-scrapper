const gameScores = [12, 58, 99];
const names = ["jac", "walo", "admus", "zibi"];

const getLastItem = <PlaceholderType>(
  array: PlaceholderType[]
): PlaceholderType | undefined => {
  return array[array.length - 1];
};

console.log(gameScores);
console.log(names);

const a = getLastItem(gameScores);
const b = getLastItem(names);

console.log("a: ", a);
console.log("b: ", b);
