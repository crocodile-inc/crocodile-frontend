import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';

interface MainProps {
  children?: ReactNode;
}
export const Main: FC<MainProps> = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, my: 2 }}
    >
      {children}
    </Container>
  );
};
