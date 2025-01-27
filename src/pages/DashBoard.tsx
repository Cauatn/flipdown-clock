import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import SessionsList from "../components/SessionsList";
import { filterChartData } from "@/hooks/filter-chart-data";
import { useUser } from "@clerk/clerk-react";
import { fetchStudyTimes } from "@/hooks/fetchStudyTimes";

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
  const { user } = useUser();
  const [data, setData] = useState<{ date: string; time: number }[]>([]);
  const [timeRange] = useState(90);

  useEffect(() => {
    let isMounted = true;

    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const studyTimes = await fetchStudyTimes(user.id);
        if (isMounted) setData(studyTimes);
      } catch (error) {
        console.error("Error fetching study times", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const chartData = filterChartData(data, timeRange);

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
                  return Number(acc + item.time);
                }, 0)}
              </span>
              <span className="text-lg">horas</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChartData data={chartData} />
      {user ? (
        <SessionsList data={data} />
      ) : (
        <>Por favor cadastre-se para exibirmos seus estudos</>
      )}
    </main>
  );
}

function ChartData({ data = [] }: { data: { date: string; time: string }[] }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Gráfico de tempo</CardTitle>
        <CardDescription>
          Controle o tempo que você está se esforçando :)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
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
            <Bar dataKey="time" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
