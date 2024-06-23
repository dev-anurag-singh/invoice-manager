import { ChevronRight, Dot } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import moment from "moment";
import Link from "next/link";
import InvoiceStatus from "./InvoiceStatus";

interface InvoiceCardProps {
  invoice: {
    id: string;
    paymentDue: string;
    status: string;
    total: number;
    clientName: string;
  };
}

function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link href={`/invoices/${invoice.id}`} className="block">
      <Card className="group transition-all hover:border-primary hover:shadow-md">
        <CardContent className="pt-6 md:py-4 lg:px-8">
          <div className="relative space-y-6 md:grid md:grid-cols-[1fr_16.5rem] md:items-center md:space-y-0">
            <div className="flex justify-between md:grid md:grid-cols-[2fr_3fr_3fr]">
              <div className="text-sm">
                <span className="mr-[1px]">#</span>
                <span className="text-foreground">{invoice.id}</span>
              </div>
              <div className="absolute bottom-8 left-0 space-x-[6px] text-xs md:static">
                <span className="text-foreground-light">Due</span>
                <span>{moment(invoice.paymentDue).format("D MMM YYYY")}</span>
              </div>
              <div>
                <p className="text-xs">{invoice.clientName}</p>
              </div>
            </div>
            <div className="flex items-end justify-between md:grid md:grid-cols-[1fr_6.5rem_1rem] md:items-center md:gap-5">
              <p className="pr-5 text-md text-foreground md:text-right">
                $ {invoice.total}
              </p>
              <InvoiceStatus status={invoice.status} />
              <div className="hidden md:block">
                <ChevronRight className="h-4 w-4 stroke-primary stroke-[3px] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default InvoiceCard;
