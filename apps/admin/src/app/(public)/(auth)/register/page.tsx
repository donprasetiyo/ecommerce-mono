import { redirect } from "next/navigation";
import { validateRequestAdmin } from "@admin/auth/validateRequest";

import MainRegister from "./main";

const Page = async () => {
  const { session } = await validateRequestAdmin();

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
