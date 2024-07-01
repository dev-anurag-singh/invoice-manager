type address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

type item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export interface TInvoice {
  id: string;
  invoiceDate: string;
  paymentDue: string;
  description: string;
  paymentTerm: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: address;
  clientAddress: address;
  items: item[];
  total: number;
}
