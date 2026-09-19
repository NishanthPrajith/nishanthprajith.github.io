export const chartColors = ['#0F0E0C', '#8F8C85', '#CBCAC6'];

export const getBarColors = (values: number[]): string[] => {
  const sorted = [...values].sort((a, b) => b - a);

  return values.map((value) => {
    if (value === sorted[0]) {
      return chartColors[0]; // highest
    }

    if (value === sorted[1]) {
      return chartColors[1]; // second highest
    }

    return chartColors[chartColors.length - 1]; // everything else
  });
};
