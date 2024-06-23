"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { useState } from "react";
import InvoiceForm from "./InvoiceForm";

function CreateInvoice() {
  const [isOpen, setIsOpen] = useState(false);

  // FUNCTION TO CLOSE SHEET
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="py-2 pl-[6px] pr-4">
          <CirclePlus id="icon-plus" className="mr-2 h-8 w-8 fill-white" />
          <span className="mr-1 mt-[2px]">New</span>
          <span className="mt-[2px] hidden md:inline-block">Invoice</span>
        </Button>
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
              New Invoice
            </SheetTitle>
          </SheetHeader>
          <InvoiceForm onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateInvoice;
