import { LoginForm } from "@/components/login-form";
import Navbar from "../components/Navbar";

const Page = () => {
  return (
    <div>
    <Navbar/>
<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    </div>
  );
};

export default Page;
