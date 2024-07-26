export function filterChartData(chartData: any[], timeRange: number): any[] {
  return chartData.filter((item: any) => {
    const date = new Date(item.date);
    const now = new Date();

    let daysToSubtract = 90;

    daysToSubtract = timeRange;

    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
}
