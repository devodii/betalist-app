import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LoginComponent } from "@components/login-component";

interface Props {
  searchParams: {
    path: string;
  };
}

export default async function SignInPage({ searchParams: { path } }: Props) {
  const user = await getServerSession();

  if (user?.user) {
    redirect(`/dashboard`);
  }

  return <LoginComponent path={path} />;
}
