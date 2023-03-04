export const calculatePercentaje = (num1, num2) => {
  const percentage = (num2 * 100) / num1;
  const percentageInFavor = Math.round(100 - percentage);

  return percentageInFavor;
};
