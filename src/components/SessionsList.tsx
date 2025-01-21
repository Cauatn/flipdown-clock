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
import { removeStudyTime } from "@/hooks/removeStudyTime";
import { useEffect, useState } from "react";

function SessionsList({ data }: { data: any }) {
  const [sessions, setSessions] = useState<
    { id: number; date: string; time: number }[]
  >([]);

  useEffect(() => {
    setSessions(data);
  }, [data]);

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }

  async function handleRemove(id: number) {
    const result = await removeStudyTime(id);
    if (result.success) {
      setSessions((prev) => prev.filter((session) => session.id !== id));
    } else {
      alert("Erro ao remover a sessão.");
    }
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
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="w-[33%] text-left">
                {formatDate(new Date(session.date))}
              </TableCell>
              <TableCell className="w-[33%] text-center">
                {formatTime(session.time)}
              </TableCell>
              <TableCell className="w-[33%] text-right">
                <button onClick={() => handleRemove(session.id)}>
                  <Trash2 className="size-5" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SessionsList;
