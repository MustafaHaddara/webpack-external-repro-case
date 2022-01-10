import { createContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MyContext = createContext({
  foo: 'bar',
  fex: 'bax'
});

export const MySkeleton = () => (
  <Skeleton duration={2} />
);
