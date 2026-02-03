export const StatusFilter = {
  All: "all",
  Completed: "true",
  Incomplete: "false",
} as const;

export type StatusFilter =
  typeof StatusFilter[keyof typeof StatusFilter];