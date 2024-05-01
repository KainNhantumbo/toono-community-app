import * as React from "react";
import * as Lucide from "lucide-react";
import Package from "../../package.json";
import {
  RiFacebookLine,
  RiPinterestLine,
  RiTwitterXLine,
  RiWhatsappLine
} from "@remixicon/react";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const SharePost = (props: { title: string; slug: string }) => {
  const data = [
    {
      name: "Share on LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${Package.url}/community/posts/${props.slug}&title=${props.title}`,
      icon: Lucide.LinkedinIcon
    },
    {
      name: "Share on Whatsapp",
      url: `https://api.whatsapp.com/send?text=${props.title}&url=${Package.url}/community/posts/${props.slug}`,
      icon: RiWhatsappLine
    },
    {
      name: "Share on Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${Package.url}/community/posts/${props.slug}`,
      icon: RiFacebookLine
    },
    {
      name: "Share by e-mail",
      url: `mailto:?subject=${props.title}&body=${Package.url}/community/posts/${props.slug}`,
      icon: Lucide.Mail
    },
    {
      name: "Share on Twitter",
      url: `https://twitter.com/intent/tweet/customer-orders?text=${Package.url}/community/posts/${props.slug}`,
      icon: RiTwitterXLine
    },
    {
      name: "Share on Pinterest",
      url: `https://pinterest.com/pin/create/button/?url=${Package.url}/community/posts/${props.slug}&media=${Package.url}/community/posts/${props.slug}`,
      icon: RiPinterestLine
    }
  ];

  const sorted = React.useMemo(
    () => data.sort((a, b) => (a.name > b.name ? 1 : -1)),
    [data]
  );

  return (
    <Dropdown.DropdownMenu>
      <Dropdown.DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className='flex w-full select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
          <Lucide.Share className='mr-2 h-auto w-4' />
          <span>Share</span>
        </Button>
      </Dropdown.DropdownMenuTrigger>
      <Dropdown.DropdownMenuContent>
        <Dropdown.DropdownMenuLabel>
          <span>Share this post</span>
        </Dropdown.DropdownMenuLabel>

        {sorted.map((item, i) => (
          <Dropdown.DropdownMenuItem asChild key={i}>
            <Link
              to={item.url}
              target='_blank'
              rel='noreferrer noopener'
              className='flex cursor-pointer items-center'>
              <item.icon className='mr-2 h-auto w-4' />
              <span>{item.name}</span>
            </Link>
          </Dropdown.DropdownMenuItem>
        ))}
      </Dropdown.DropdownMenuContent>
    </Dropdown.DropdownMenu>
  );
};
