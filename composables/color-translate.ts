export default (color: string) => {
  const lpoConfig = useLpoConfig()

  const colorData = lpoConfig.colors || {}

  return colorData[color] || "#ffffff";
}