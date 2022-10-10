import { Chip, Container, Divider, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useLocale } from '~/shared/hooks/useLocale';
import { t } from 'ttag';

export const Footer = () => {
  const theme = useTheme();

  const { setLocale, locales, getLocale } = useLocale();
  const currentLocale = getLocale();

  return (
    <Paper
      component="footer"
      sx={{ p: 2, border: 0, borderTop: `1px solid ${theme.palette.divider}` }}
      variant="outlined"
      square
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <Typography sx={{ textAlign: 'center' }}>
          {t`All rights reserved ©`} <span className="gradient-text">{t`Crocodile`}</span>
        </Typography>
        <Stack
          alignSelf="center"
          direction="row"
          alignItems="center"
          height="min-content"
          divider={<Divider orientation="vertical" variant="middle" flexItem />}
          spacing={2}
        >
          {locales.map(locale => (
            <Chip
              key={locale}
              sx={{ opacity: '.5', cursor: 'pointer' }}
              label={locale}
              variant={locale === currentLocale ? 'filled' : 'outlined'}
              size="small"
              onClick={setLocale(locale)}
            />
          ))}
        </Stack>
      </Container>
    </Paper>
  );
};
