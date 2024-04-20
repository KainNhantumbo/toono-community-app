import { CoffeeIcon, MailCheckIcon, SquareStackIcon } from "lucide-react";
import { RiGithubLine } from "@remixicon/react";
import Package from "../../package.json";

export const metadata = {
  author: Package.author.name,
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  repository: Package.repository,
  websiteName: Package.websiteName,
  websiteUrl: Package.url,
  description: Package.description,
  copyright: `${new Date().getFullYear()} ${Package.metadata.name}`,
  contacts: [
    { name: "Buy me a coffee", icon: CoffeeIcon, url: Package.author.donate },
    { name: "Github", icon: RiGithubLine, url: Package.author.github },
    { name: "Portfolio", icon: SquareStackIcon, url: Package.author.portfolio },
    { name: "E-mail", icon: MailCheckIcon, url: `mailto:${Package.author.email}` }
  ]
};

export const ALLOWED_MIMETYPES: string[] = ["image/png", "image/jpeg", "image/jpg"];

export const DEFAULT_ERROR_MESSAGE = "Oops! Something went wrong. Please try again later.";

export const LOADING_SCREEN_MESSAGES = [
  "Loading awesomeness... 🚀",
  "Revving up the engines... 🛠️",
  "Gathering stardust for your experience... ✨",
  "Patience, we're crafting magic... 🎩✨",
  "Loading dreams into reality... 💭💡",
  "Brewing creativity... ☕🎨",
  "Preparing pixels for perfection... 🖥️🔍",
  "Loading brilliance... 💎✨",
  "Cooking up something special... 🍳👩‍🍳",
  "Synchronizing thoughts and bytes... 🔄💭",
  "Putting the 'awe' in 'awesome'... 😎👌",
  "Strapping in for an epic journey... 🌌🚀",
  "Brace yourself, innovation incoming... 🛡️💡",
  "Cranking up the creativity dial... 🔊🎨",
  "Loading your next big adventure... 🗺️🔍",
  "Spinning up the digital playground... 🌀🎮",
  "One moment, weaving wonders... 🧵✨",
  "Stay tuned, masterpiece loading... 🎵🎨",
  "Fueling up with inspiration... ⛽💡",
  "Constructing the bridge to imagination... 🌉🌌"
];

export const FOOTER_URLS: { path: string; label: string }[][] = [
  [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" }
  ],
  [
    { label: "Contact", path: "/contact" },
    { label: "Terms of Use", path: "/terms-of-use" }
  ],
  [
    { label: "Privacy  Policy", path: "/privacy-policy" },
    { label: "Code of Conduct", path: "/code-of-conduct" }
  ],
  [
    { label: "Sign In", path: "/auth/sign-in" },
    { label: "Sign Up", path: "/auth/sign-up" }
  ]
];
