import { DeleteAccountAlert } from "@/components/delete-account-alert";
import { Layout } from "@/components/layout";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import * as CardRoot from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/app-context";
import { ThemeVariants, useThemeContext } from "@/context/theme-context";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { RootState } from "@/state/store";
import * as Lucide from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Configurations() {
  const { client } = useAppContext();
  const auth = useSelector((state: RootState) => state.auth);
  const { theme, handleChangeTheme } = useThemeContext();
  const [isDownloadLoading, setIsDownloadLoading] = React.useState<{
    status: boolean;
    type: "csv" | "json" | "text";
  }>({ status: false, type: "csv" });

  const handleDownloadBackup = async (type: "csv" | "json" | "text") => {
    let filename = `${auth.name.toUpperCase()} [${auth.id}] [${new Date().toISOString()}]`;
    try {
      setIsDownloadLoading({ status: false, type });
      const { data } = await client<string>({
        method: "get",
        url: `/api/v1/backup/${type}`
      });

      let blob = new Blob();

      if (type === "csv") {
        blob = new Blob([data], { type: "application/xlsx" });
        filename = filename.concat(".xlsx");
      } else if (type === "text") {
        blob = new Blob([data], { type: "text/plain" });
        filename = filename.concat(".txt");
      } else if (type === "json") {
        blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        filename = filename.concat(".json");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { label: "Retry Download", onClick: () => handleDownloadBackup(type) }
      });
    } finally {
      setIsDownloadLoading({ status: false, type });
    }
  };

  return (
    <Layout>
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 px-3'>
        <div className='flex items-center gap-5'>
          <TooltipWrapper content='Back'>
            <Button
              onClick={() => history.back()}
              variant={"outline"}
              size={"icon"}
              className='rounded-full'>
              <Lucide.ArrowLeft className='h-auto w-6' />
            </Button>
          </TooltipWrapper>
          <Heading title='Configurations' description='Manage common configurations' />
        </div>

        <section className='flex w-full flex-col gap-3'>
          <CardRoot.Card className='shadow-none'>
            <CardRoot.CardHeader>
              <CardRoot.CardTitle>Appearance</CardRoot.CardTitle>
              <CardRoot.CardDescription>Customize the UI colors</CardRoot.CardDescription>
            </CardRoot.CardHeader>
            <CardRoot.CardContent>
              <RadioGroup
                defaultValue={theme}
                onValueChange={(value) => handleChangeTheme(value as ThemeVariants)}
                className='flex flex-wrap items-center gap-3'>
                <div className='flex flex-wrap items-center gap-3'>
                  <RadioGroupItem value='light' id='light' className='sr-only' />
                  <Label htmlFor='light'>
                    <div
                      className={cn(
                        {
                          "border-dashed border-primary ": theme === "light"
                        },
                        "flex h-36 w-48 flex-col items-center justify-around rounded-lg border-4 p-2"
                      )}>
                      <div className='flex w-full items-center gap-2'>
                        <Lucide.SunDimIcon className='h-auto w-8 stroke-muted-foreground' />
                        <Skeleton className='h-2 w-full animate-none rounded-full bg-muted-foreground/50' />
                      </div>
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-muted-foreground/50' />
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-muted-foreground/50' />
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-muted-foreground/50' />
                    </div>
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='dark' id='dark' className='sr-only' />
                  <Label htmlFor='dark'>
                    <div
                      className={cn(
                        {
                          "border-dashed border-primary ": theme === "dark"
                        },
                        "flex h-36 w-48 flex-col items-center justify-around rounded-lg border-4 p-2"
                      )}>
                      <div className='flex w-full items-center gap-2'>
                        <Lucide.MoonStarIcon className='h-auto w-8 stroke-muted-foreground' />
                        <Skeleton className='h-2 w-full animate-none rounded-full bg-primary/40' />
                      </div>
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-primary/40' />
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-primary/40' />
                      <Skeleton className='h-2 w-full animate-none rounded-full bg-primary/40' />
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardRoot.CardContent>
          </CardRoot.Card>

          <CardRoot.Card className='shadow-none'>
            <CardRoot.CardHeader>
              <CardRoot.CardTitle>Backup</CardRoot.CardTitle>
              <CardRoot.CardDescription>
                Download and backup your saved posts
              </CardRoot.CardDescription>
            </CardRoot.CardHeader>
            <CardRoot.CardContent>
              Your can backup your posts data by selecting one of the data formats you may
              want below.
            </CardRoot.CardContent>
            <CardRoot.CardFooter className='flex flex-wrap items-center gap-3'>
              <LoadingButton
                variant={"outline"}
                loading={isDownloadLoading.status && isDownloadLoading.type === "csv"}
                onClick={() => handleDownloadBackup("csv")}>
                <Lucide.FileSpreadsheet className='mr-2 h-auto w-4 text-green-500' />
                <span>Download as CSV</span>
              </LoadingButton>
              <LoadingButton
                variant={"outline"}
                loading={isDownloadLoading.status && isDownloadLoading.type === "json"}
                onClick={() => handleDownloadBackup("json")}>
                <Lucide.FileJson className='mr-2 h-auto w-4 text-rose-500' />
                <span>Download as JSON</span>
              </LoadingButton>
              <LoadingButton
                variant={"outline"}
                loading={isDownloadLoading.status && isDownloadLoading.type === "text"}
                onClick={() => handleDownloadBackup("text")}>
                <Lucide.FileText className='mr-2 h-auto w-4 text-blue-500' />
                <span>Download as Plain Text</span>
              </LoadingButton>
            </CardRoot.CardFooter>
          </CardRoot.Card>

          <CardRoot.Card className='border-destructive bg-destructive/10'>
            <CardRoot.CardHeader>
              <CardRoot.CardTitle className='text-destructive'>
                Danger Zone
              </CardRoot.CardTitle>
              <CardRoot.CardDescription>Delete your account</CardRoot.CardDescription>
            </CardRoot.CardHeader>
            <CardRoot.CardContent>
              By clicking here, you will delete your user account and remove all associated
              with it. Proceed carefully.
            </CardRoot.CardContent>
            <CardRoot.CardFooter>
              <DeleteAccountAlert />
            </CardRoot.CardFooter>
          </CardRoot.Card>
        </section>
      </main>
    </Layout>
  );
}
