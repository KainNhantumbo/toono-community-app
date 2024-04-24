import { Layout } from "@/components/layout";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { isUUID } from "class-validator";
export default function PostsEditor() {
  const params = useParams();
  const isUpdate: boolean = isUUID(params["id"]);

  console.info(isUpdate);

  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl space-y-5 px-3'>
        <section className='flex w-full flex-wrap items-center justify-between gap-3'>
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
            <Heading title='Posts Editor' description='Create and update your posts' />
          </div>
        </section>

        <Separator decorative />
      </main>
    </Layout>
  );
}
