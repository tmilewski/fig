function hashCode(str: string): number {
  let hash = 0

  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  return hash
}

export function hslFromString(str: string, opts: { lightness?: number; saturation?: number } = {}): string {
  const { lightness = 50, saturation = 100 } = opts
  return `hsl(${hashCode(str) % 360}, ${saturation}%, ${lightness}%)`
}
