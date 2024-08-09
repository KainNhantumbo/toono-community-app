import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { useLocalStorage } from "@uidotdev/usehooks";

export const Greet = () => {
  const [canGreet, setCanGreet] = useLocalStorage("user-greet", true);

  return (
    <Drawer open={canGreet} onClose={() => setCanGreet(false)}>
      <DrawerContent className='p-3'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle className='text-center'>
              Welcome to Toono Community! 🚀
            </DrawerTitle>
            <DrawerDescription className='text-center'>
              We are happy to have you here to explore with us.
            </DrawerDescription>
          </DrawerHeader>

          <section className='space-y-3 text-justify'>
            <p>
              Dive into a vibrant hub of innovation, where coders, creators, and tech
              enthusiasts unite. Whether you're here to share your latest project, seek
              expert advice, or simply explore cutting-edge trends, you've found your home.
            </p>

            <p>
              Connect, collaborate, and transform ideas into reality with fellow developers
              from around the globe.
            </p>

            <p> Let's build and explore the future like adventurers together! 💻✨</p>
          </section>

          <DrawerFooter>
            <DrawerClose asChild onClick={()=> setCanGreet(false)}>
              <Button variant='outline'>Get Started!</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
