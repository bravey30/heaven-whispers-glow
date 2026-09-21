// The deposit is shown as informational — booking submission is never
// blocked on it.

export const DEPOSIT_AMOUNT_TZS = 30000;

export type PaymentAccount = {
  provider: string; // e.g. "CRDB", "M-PESA"
  accountName: string;
  accountNumber: string;
};

export const PAYMENT_ACCOUNTS: PaymentAccount[] = [
  {
    provider: "CRDB",
    accountName: "Suzana Tryphone Ruhogora",
    accountNumber: "0152610572400",
  },
  {
    provider: "NMB",
    accountName: "Suzana Tryphon Ruhogora",
    accountNumber: "33710028035",
  },
  {
    provider: "Lipa M-PESA",
    accountName: "Heaven Aesthetics",
    accountNumber: "352329602",
  },
];
