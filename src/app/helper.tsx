const direction_list = ["left", "right", "up", "down", "out the page", "in the page"] as const;
type direction = typeof direction_list[number];
type charge = "positive" | "negative";

export type { direction, charge };
export { direction_list };