import type { FC } from 'react';

export type HeadingProps = {
  title: string;
  description: string;
};

export const Heading: FC<HeadingProps> = ({ title, description }) => (
  <div>
    <h2 className='font-display text-3xl font-bold tracking-tight text-card-foreground'>
      {title}
    </h2>
    <p className='text-sm text-muted-foreground'>{description}</p>
  </div>
);
