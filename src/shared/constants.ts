import { CoffeeIcon, MailCheckIcon, SquareStackIcon } from 'lucide-react';
import { RiGithubLine } from '@remixicon/react';
import Package from '../../package.json';

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
    { name: 'Buy me a coffee', icon: CoffeeIcon, url: Package.author.donate },
    { name: 'Github', icon: RiGithubLine, url: Package.author.github },
    { name: 'Portfolio', icon: SquareStackIcon, url: Package.author.portfolio },
    { name: 'E-mail', icon: MailCheckIcon, url: `mailto:${Package.author.email}` }
  ]
};


export const ALLOWED_MIMETYPES: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

