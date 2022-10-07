import { UnraveledPicture as IUnraveledPicture } from '~/features/gallery/models';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import { routes } from '~/routes';
import { Box, Typography } from '@mui/material';
import { config } from '~/config';
import styles from './UnraveledPicture.module.css';
import classNames from 'classnames';

interface UnraveledPictureProps {
  picture: IUnraveledPicture;
}

export const UnraveledPicture: FC<UnraveledPictureProps> = ({ picture }) => {
  const { id, answer } = picture;
  return (
    <Link
      to={reverse(routes.rooms.room, { roomId: id })}
      style={{ height: '100%' }}
      className={classNames(styles.picture, { [styles.big]: picture.bigSize })}
    >
      <Box sx={{ border: '1px solid black', height: '100%' }}>
        <img
          alt={answer}
          style={{ width: '100%', borderBottom: '1px solid black' }}
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
