import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import SessionsList from "./SessionsList";

const data = JSON.parse(localStorage.getItem("time_list") ?? "[]");

const chartData = data.map((item: any) => {
  return {
    date: formatDate(new Date(item.date)),
    time: item.time,
  };
});

const chartConfig = {
  views: {
    label: "tempo (segundos)",
  },
  time: {
    label: "time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function Dashboard() {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = chartData.filter((item: any) => {
    const date = new Date(item.date);
    const now = new Date();

    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <main className="h-full w-full py-2 px-4 flex justify-start flex-col space-y-8">
      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle>Gráfico de tempo</CardTitle>
          <CardDescription>
            Gráfico para você ter um controle maior sobre o tempo que você está
            se esforçando :)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
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
                      return new Date(value).toLocaleDateString("en-US", {
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
      <SessionsList />
    </main>
  );
}

export default Dashboard;
