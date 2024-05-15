export default (value: string, source: Record<string, any>) => {
  return value.replaceAll(/{([^}]+)}/g, (_, group) => source[group] ?? '')
}
