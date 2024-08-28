import * as Mantine from "@mantine/core";

export default function Notification({
  success,
  title,
}: {
  success: boolean;
  title: string;
}) {
  return <>{success && <Mantine.Notification color="teal" title={title} />}</>;
}
