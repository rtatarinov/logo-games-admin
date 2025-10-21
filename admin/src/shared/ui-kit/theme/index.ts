import { useMantineTheme } from "@mantine/core";

export * from "./context";
export * from "./themes";
export type { Colors } from "./config";

export const useTheme = useMantineTheme;
