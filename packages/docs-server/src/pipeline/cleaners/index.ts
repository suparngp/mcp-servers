import * as base from './base.js'
import * as react from './react.js'

// Registry of all available cleaners
const cleanerRegistry = new Map<
  string,
  (content: string) => string | { content: string; [key: string]: unknown }
>()

// Register base cleaners
for (const [name, fn] of Object.entries(base)) {
  cleanerRegistry.set(name, fn)
}

// Register site-specific cleaners with namespace
for (const [name, fn] of Object.entries(react)) {
  cleanerRegistry.set(`react.${name}`, fn)
}

export function getCleanerFunction(
  name: string,
): (content: string) => string | { content: string; [key: string]: unknown } {
  const cleaner = cleanerRegistry.get(name)
  if (!cleaner) {
    throw new Error(`Unknown cleaner: ${name}`)
  }
  return cleaner
}

export function listCleaners(): string[] {
  return Array.from(cleanerRegistry.keys())
}

export async function runCleaners(
  content: string,
  cleanerNames: string[],
): Promise<{ content: string; metadata: Record<string, unknown> }> {
  let currentContent = content
  const metadata: Record<string, unknown> = {}

  for (const cleanerName of cleanerNames) {
    const cleaner = getCleanerFunction(cleanerName)
    const result = cleaner(currentContent)

    if (typeof result === 'string') {
      currentContent = result
    } else {
      currentContent = result.content
      // Merge any additional properties into metadata
      for (const [key, value] of Object.entries(result)) {
        if (key !== 'content') {
          // If the key is 'metadata', spread its contents
          if (key === 'metadata' && typeof value === 'object' && value !== null) {
            Object.assign(metadata, value)
          } else {
            metadata[key] = value
          }
        }
      }
    }
  }

  return { content: currentContent, metadata }
}
