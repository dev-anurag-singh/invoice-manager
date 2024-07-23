"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import { TInvoice } from "@/lib/types";

function EditInvoice({ invoice }: { invoice: TInvoice }) {
  const [isOpen, setIsOpen] = useState(false);

  // FUNCTION TO CLOSE SHEET
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"}>Edit</Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="px-0 pb-0 pt-8 md:pt-14">
        <div className="flex h-full flex-col">
          <SheetTrigger className="mb-7 flex items-center gap-6 pl-6 md:hidden md:pl-14">
            <span>
              <ChevronLeft className="h-4 w-4 stroke-primary stroke-[3px]" />
            </span>
            <span className="mt-1 text-sm text-foreground">Go back</span>
          </SheetTrigger>
          <SheetHeader className="pb-6 pl-6 md:pb-11 md:pl-14">
            <SheetTitle className="text-left text-lg leading-8">
              Edit #{invoice.id}
            </SheetTitle>
          </SheetHeader>
          <InvoiceForm onClose={handleClose} data={invoice} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EditInvoice;
