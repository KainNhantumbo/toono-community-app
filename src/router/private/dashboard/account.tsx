import { Layout } from "@/components/layout";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { DropzoneArea } from "@/components/dropzone";
import { useUserDataQuery } from "@/hooks/use-user-data-query";
import { AlertMessage } from "@/components/alert-message";
import { errorTransformer } from "@/lib/error";
import { Loader } from "@/components/loader";
import * as React from "react";


export default function Account() {
  const { data, error, isLoading, refetch, isError } = useUserDataQuery();
  const [profileImage, setProfileImage] = React.useState<string>("");



  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl space-y-5 px-3'>
        <div className='flex items-center gap-5'>
          <TooltipWrapper content='Back'>
            <Button
              onClick={() => history.back()}
              variant={"outline"}
              size={"icon"}
              className='rounded-full'>
              <ArrowLeft className='h-auto w-6' />
            </Button>
          </TooltipWrapper>
          <Heading
            title='Account'
            description='Edit and update user account configurations'
          />
        </div>

        <section>
          {isLoading && !isError ? <Loader /> : null}
          {!isLoading && isError ? (
            <AlertMessage
              icon={AlertTriangle}
              action={{ handler: () => refetch(), label: "Retry" }}
              message={errorTransformer(error).message}
            />
          ) : null}
        </section>
      </main>
    </Layout>
  );
}
