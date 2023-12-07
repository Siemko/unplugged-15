import { Card } from "./ui/card";

export function Record({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-zinc-500 dark:text-zinc-400">{email}</p>
      <p>{message}</p>
    </Card>
  );
}
