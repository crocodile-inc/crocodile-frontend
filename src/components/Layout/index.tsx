import { FC, ReactNode } from 'react';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { Main } from '~/components/Main';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
