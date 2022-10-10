import { UnraveledPicture as IUnraveledPicture } from '~/features/gallery/models';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '~/routes';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { config } from '~/config';
import styles from './UnraveledPicture.module.css';
import classNames from 'classnames';
import { syntheticDelay } from '~/features/gallery/constants';

interface UnraveledPictureProps {
  picture: IUnraveledPicture;
}

export const UnraveledPicture: FC<UnraveledPictureProps> = ({ picture }) => {
  const theme = useTheme();

  const [timeBeforeShow, setTimeBeforeShow] = useState(syntheticDelay);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { id, answer } = picture;

  useEffect(() => {
    if (timeBeforeShow > 0) {
      const timeoutId = setTimeout(() => setTimeBeforeShow(time => time - 1), 500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeBeforeShow]);

  if (!isImgLoaded || !(timeBeforeShow <= 0)) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        className={classNames(styles.picture, styles.skeleton, { [styles.big]: picture.bigSize })}
      >
        <img
          onLoad={() => setIsImgLoaded(true)}
          alt={answer}
          style={{ display: 'none' }}
          src={`${config.serverUrl}/gallery/${id}.png`}
        />
      </Skeleton>
    );
  }
  return (
    <Link
      to={reverse(routes.rooms.room, { roomId: id })}
      style={{ height: '100%' }}
      className={classNames(styles.picture, { [styles.big]: picture.bigSize })}
    >
      <Box sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
        <img
          alt={answer}
          style={{ width: '100%', borderBottom: `1px solid ${theme.palette.divider}` }}
          src={`${config.serverUrl}/gallery/${id}.png`}
        />
        <Typography
          noWrap
          className="gradient-text text-center"
          textAlign="center"
          sx={{ maxWidth: '100%', paddingLeft: 2, paddingRight: 2 }}
        >
          {answer}
        </Typography>
      </Box>
    </Link>
  );
};
