export function filterChartData(chartData: any[], timeRange: number): any[] {
  return chartData
    .filter((item: any) => {
      const date = new Date(item.date);
      const now = new Date();
      now.setDate(now.getDate() - timeRange);
      return date >= now;
    })
    .map((item: any) => ({
      ...item,
      time: Number((item.time / 3600).toFixed(2)),
    }));
}
