import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { RootState } from "@/state/store";
import { DashboardActions } from "@/types";
import { ArrowRight, CogIcon, FilePenIcon, UserIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const actions: DashboardActions = [
  {
    label: "Configurations",
    description: "Adjust common settings",
    path: "/users/dashboard/configurations",
    icon: CogIcon
  },
  {
    label: "Account",
    description: "Adjust account data settings",
    path: "/users/dashboard/configurations",
    icon: UserIcon
  },
  {
    label: "Your posts",
    description: "Create and manage your posts",
    path: "/users/dashboard/posts",
    icon: FilePenIcon
  }
];

export default function Overview() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl space-y-5 px-3'>
        <section>
          <Heading
            title='Overview'
            description={`${auth.name}, welcome to your dashboard!`}
          />
        </section>
        <section className=' grid w-full gap-3 mobile:grid-cols-2'>
          {actions.map(({ label, path, description, icon: Icon }, i) => (
            <Card key={i} className='w-full max-w-sm shadow-none'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Icon className='h-auto w-5' />
                  <span>{label}</span>
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant={"outline"}>
                  <Link to={path}>
                    <ArrowRight className='mr-2 h-auto w-4' />
                    <span>View</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </Layout>
  );
}
