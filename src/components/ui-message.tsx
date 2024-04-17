import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';

export type UIMessageProps = { message: string; icon: LucideIcon };

export const UIMessage: FC<UIMessageProps> = ({ message, icon: Icon }) => (
  <div className='flex w-full flex-col items-center gap-4 py-12'>
    <Icon className='h-auto w-12' />
    <p className='text-md mx-auto w-full max-w-[380px] text-center font-medium'>
      {message}
    </p>
  </div>
);
