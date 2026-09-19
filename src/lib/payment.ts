// Edit these with your real deposit amount and accounts before going live.
// The deposit is shown as informational — booking submission is never
// blocked on it.

export const DEPOSIT_AMOUNT_TZS = 30000; // TODO: set your real flat deposit amount

export type PaymentAccount = {
  provider: string; // e.g. "CRDB", "M-PESA"
  accountName: string;
  accountNumber: string;
};

export const PAYMENT_ACCOUNTS: PaymentAccount[] = [
  {
    provider: "Add your bank/provider",
    accountName: "Add your account name",
    accountNumber: "0000000000",
  },
];
