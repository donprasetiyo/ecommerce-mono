import { BillingNav } from "@web/components/BillingNav";

const billingNavItems = [
  {
    title: "Overview",
    href: "/account/billing",
  },
  // {
  //     title: "Payment method",
  //     href: "/account/billing/payment-methods",
  // },
  {
    title: "Billing history",
    href: "/account/billing/history",
  },
  // {
  //     title: "Preferences",
  //     href: "/account/billing/preferences",
  // }
];

interface BillingLayoutProps {
  children: React.ReactNode;
}

const BillingLayout = ({ children }: BillingLayoutProps) => {
  return (
    <>
      <BillingNav items={billingNavItems} />
      {children}
    </>
  );
};

export default BillingLayout;
