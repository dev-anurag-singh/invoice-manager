import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

function InvoiceStatus({ status }: { status: string }) {
  return (
    <div
      className={cn(
        "flex w-[6.5rem] items-center justify-center rounded-md bg-carbon-blue/5 pb-[11px] pt-[14px] text-carbon-blue",
        {
          "bg-green/5 text-green": status === "paid",
          "bg-orange/5 text-orange": status === "pending",
          "bg-carbon-blue/5 text-carbon-blue dark:bg-grey/5 dark:text-[#DFE3FA]":
            status === "draft",
        },
      )}
    >
      <Dot className="stroke-[8px]" />
      <p className="pr-[6px] pt-[3px] text-sm capitalize">{status}</p>
    </div>
  );
}

export default InvoiceStatus;
