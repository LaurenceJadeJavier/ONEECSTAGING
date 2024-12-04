export interface SingleBill {
  status: string;
  message: string;
  data: {
    id: number;
    meterAccountId: number;
    fromDate: string;
    toDate: string;
    nextDate: string;
    billDate: string;
    readingDate: string;
    cRead: number;
    pRead: number;
    kwhConsume: number;
    distribution: number;
    generation: number;
    sLoss: number;
    transmission: number;
    subsidies: number;
    gTax: number;
    fitAll: number;
    applied: number;
    other: number;
    uCharges: number;
    rate: number;
    amount: number;
    referenceNumber: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    prevBill: number;
    meterAccount: {
      id: number;
      coopId: number;
      meterNumber: number;
      meterAccountName: string;
      meterAddress: string;
      customerType: string;
      meterActivated: boolean;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      accountRegistry: [
        {
          id: number;
          userId: number;
          meterId: number;
          status: string;
          createdAt: string;
          updatedAt: string;
          deletedAt: string | null;
          user: {
            id: number;
            first_name: string;
            middle_name: string;
            last_name: string;
            birthdate: string;
            email: string;
            contact_number: string;
            gender: string;
            address: string;
            role: string;
            created_at: string;
            updated_at: string;
            deleted_at: string | null;
          };
        }
      ];
    };
  };
  code: number;
}
