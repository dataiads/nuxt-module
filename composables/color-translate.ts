export default (color: string) => {
  const lpoConfig = useLpoConfig()

  const colorData = lpoConfig.colorData || {}

  return colorData[color] || "#ffffff";
}