import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";

import { Trash2 } from "lucide-react";
import { formatDate } from "@/hooks/format-date";

function SessionsList() {
  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-lg">Sessões</h1>
        <p className="text-sm">
          Lista de sessões feitas, sem mais finalidades além disso, vou pensar
          ainda.
        </p>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead className="text-center">Horas feitas</TableHead>
            <TableHead className="text-right">Apagar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {JSON.parse(localStorage.getItem("time_list") ?? "[]").map(
            (element: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="w-[33%] text-left">
                  {formatDate(new Date(element.date))}
                </TableCell>
                <TableCell className="w-[33%] text-center">
                  {formatTime(element.time)}
                </TableCell>
                <TableCell className="w-[33%] text-right">
                  <button
                    onClick={(_e) => {
                      const list = localStorage.getItem("time_list");
                      if (list) {
                        const new_list = JSON.parse(list);
                        new_list.splice(index, 1);
                        localStorage.setItem(
                          "time_list",
                          JSON.stringify(new_list)
                        );
                        window.location.reload();
                      }
                    }}
                  >
                    <Trash2 className="size-5" />
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SessionsList;
