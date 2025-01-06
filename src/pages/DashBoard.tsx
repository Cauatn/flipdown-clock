import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { formatDate } from "@/hooks/format-date";
import SessionsList from "../components/SessionsList";
import { filterChartData } from "@/hooks/filter-chart-data";

const data = JSON.parse(localStorage.getItem("time_list") ?? "[]");

const chartData = data.map((item: any) => {
  return {
    date: formatDate(new Date(item.date)),
    time: (item.time / 3600).toFixed(2),
  };
});

const chartConfig = {
  views: {
    label: "tempo (hora)",
  },
  time: {
    label: "time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Dashboard() {
  const [timeRange] = useState(90);

  return (
    <main className="py-2 px-4 flex justify-start flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full h-fit">
          <CardHeader>
            <CardTitle>Tempo total na semana</CardTitle>
            <CardDescription>Horas feitas durante a semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-3xl font-bold">
                {filterChartData(data, 7).reduce((acc: number, item: any) => {
                  return Number((acc + item.time / 3600).toFixed(2));
                }, 0)}
              </span>
              <span className="text-lg">horas</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChartData data={filterChartData(chartData, timeRange)} />
      <SessionsList />
    </main>
  );
}

function ChartData({ data = [] }: { data: { date: string; time: number }[] }) {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Gráfico de tempo</CardTitle>
        <CardDescription>
          Gráfico para você ter um controle maior sobre o tempo que você está se
          esforçando :)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis domain={[0, "dataMax"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                date.setDate(date.getDate() + 1);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"time"} fill={"hsl(var(--chart-2))"} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="h-fit max-h-10">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Historico recente <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Dashboard;
