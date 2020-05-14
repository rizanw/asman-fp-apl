export function formatIndonesianCurrency(number) {
  const formatNumber = new Intl.NumberFormat(["ban", "id"]).format(number);
  return formatNumber;
}
