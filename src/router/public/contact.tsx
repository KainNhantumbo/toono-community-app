import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function ContactUsPage() {
  useDocumentTitle("Contact - Toono Community")

  return (
    <Layout>
      <main className='mx-auto mb-3 flex w-full max-w-4xl gap-3 px-3'>
        <div className='w-ful mx-auto max-w-xl px-4 text-center'>
          <h1 className='my-4 text-3xl font-bold'>Contact Us</h1>
          <h1 className='mb-4 rounded-xl border border-dashed p-4 text-4xl font-bold text-primary'>
            HELLO, TOONO?
          </h1>
          <p className='mb-8'>
            You've got some Q's and we've got tons and tons of A's, so let's chat.
            <br />
            Whether it's about an question or suggestion, what you should name your puppy...
            anything we can help with! Don't be shy — we promise we're really nice.
          </p>

          <form className='text-left'>
            <div className='mb-4'>
              <Label htmlFor='name'>NAME</Label>
              <Input id='name' type='text' placeholder='Your name' />
            </div>
            <div className='mb-4'>
              <Label htmlFor='email'> EMAIL</Label>
              <Input id='email' type='email' placeholder='Your email' />
            </div>
            <div className='mb-4'>
              <Label htmlFor='topic'>TOPIC</Label>
              <Input id='topic' type='text' placeholder='Topic' />
            </div>
            <div className='mb-4'>
              <Label htmlFor='question'>QUESTION</Label>
              <Textarea rows={8} id='question' placeholder='Your question' />
            </div>
            <div className='flex justify-center'>
              <Button variant={"outline"} type='submit'>
                SUBMIT NOW
              </Button>
            </div>
          </form>

          <div className='mt-10'>
            <p>
              Wanna chat with our core team?
              <br />
              Call <strong>1-800-927-0377</strong>
              <br />
              Monday-Friday 9am-3pm GMT+3
            </p>
            <p className='mt-4'>
              Wanna book a call?
              <br />
              <a href='#' className='text-primary underline'>
                Tap here...
              </a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
