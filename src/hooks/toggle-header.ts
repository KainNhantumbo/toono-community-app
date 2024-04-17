import { useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

export const useToggleHeader = (breakpoint: number) => {
  const { width: innerWidth } = useWindowSize();
  const [isBreakPoint, setIsBreakPoint] = useState<boolean>(false);

  useEffect((): void => {
    if (innerWidth && innerWidth > breakpoint) {
      setIsBreakPoint(true);
    }
    setIsBreakPoint(false);
  }, [innerWidth, breakpoint]);

  return {
    isBreakPoint,
    onToggleReveal: () => setIsBreakPoint((current) => !current)
  };
};