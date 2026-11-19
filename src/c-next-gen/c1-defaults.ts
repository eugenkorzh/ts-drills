export type Settings = { theme: "light" | "dark"; fontSize: number; autosave: boolean };

export type Config = { display?: { fontSize?: number } };

export function mergeSettings(defaults: Settings, overrides: Partial<Settings>): Settings {
  return {...defaults, ...overrides};
}

export function fontSizeOf(config: Config | undefined): number {
  return config?.display?.fontSize ?? 14;
}