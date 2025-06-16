// React-specific cleaners

export const cleanVersionBadges = (content: string): string => {
  // Remove version badges like "Added in: v18.0.0"
  return content.replace(/^\s*Added in:\s*v[\d.]+\s*$/gm, '')
}

export const cleanCanaryWarnings = (content: string): string => {
  // Remove canary/experimental warnings
  return content.replace(/^>\s*\*\*Canary:\*\*[\s\S]*?(?=\n\n)/gm, '')
}

export const normalizeApiTables = (content: string): string => {
  // Clean up API reference tables for better chunking
  return content.replace(/\|\s+/g, '| ').replace(/\s+\|/g, ' |')
}

export const extractApiSignature = (content: string): { content: string; signature?: string } => {
  // Extract function signatures for better search
  const signatureMatch = content.match(
    /```(?:jsx?|typescript|tsx?)\n((?:function|const|export)[\s\S]*?)\n```/,
  )

  if (signatureMatch) {
    return {
      content,
      signature: signatureMatch[1].trim(),
    }
  }

  return { content }
}
