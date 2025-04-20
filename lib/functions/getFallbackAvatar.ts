import { split } from 'lodash'

export default function getFallbackAvatar(name?: string) {
  if (!name) return ''
  let result = ''
  split(name, " ").forEach((s: string) => result += s.charAt(0))
  return result
}
