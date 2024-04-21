import { Layout } from "@/components/layout";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeVariants, useThemeContext } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import { ArrowLeft, MoonStarIcon, SunDimIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Configurations() {
  const { theme, handleChangeTheme } = useThemeContext();

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
          <Heading title='Configurations' description='Manage common configurations' />
        </div>

        <section className='flex w-full flex-col gap-3'>
          <Card className='base-border shadow-none'>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the UI colors</CardDescription>
            </CardHeader>
            <CardContent>
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
                          "border-2 border-primary ": theme === "light"
                        },
                        "base-border flex h-28 w-28 flex-col items-center justify-around rounded-lg p-2"
                      )}>
                      <div className='flex w-full items-center gap-2'>
                        <SunDimIcon className='h-auto w-8' />
                        <Skeleton className='h-4 w-full animate-none rounded-full' />
                      </div>
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                    </div>
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='dark' id='dark' className='sr-only' />
                  <Label htmlFor='dark'>
                    <div
                      className={cn(
                        {
                          "border-2 border-primary ": theme === "dark"
                        },
                        "base-border flex h-28 w-28 flex-col items-center justify-around rounded-lg p-2"
                      )}>
                      <div className='flex w-full items-center gap-2'>
                        <MoonStarIcon className='h-auto w-8' />
                        <Skeleton className='h-4 w-full animate-none rounded-full' />
                      </div>
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                      <Skeleton className='h-2 w-full animate-none rounded-full' />
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
}
