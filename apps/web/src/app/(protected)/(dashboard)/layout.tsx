import HomeLayoutPublic from "@web/app/(public)/(homepage)/homelayout";
import { validateRequestRegular } from "@web/auth/validateRequestRegular";

const DashboardLayout = async (prop: any) => {
  const { user, session } = await validateRequestRegular();

  if (!session) {
    return <HomeLayoutPublic>{prop.children}</HomeLayoutPublic>;
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
      </div>
      <div className="ring-offset-background focus-visible:ring-ring mt-2 space-y-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
        {prop.children}
      </div>
    </>
  );
};

export default DashboardLayout;
