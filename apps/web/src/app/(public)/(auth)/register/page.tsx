import { redirect } from "next/navigation";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

import MainRegister from "./main";

const Page = async () => {
  const { session } = await validateRequestRegular();

  if (session) redirect("/");

  return (
    <>
      <div className="bg-card text-card-foreground m-auto max-w-lg rounded-lg border shadow-sm">
        <MainRegister />
      </div>
    </>
  );
};

export default Page;
