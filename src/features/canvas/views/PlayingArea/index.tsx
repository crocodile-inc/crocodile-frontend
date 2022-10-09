import { FC, SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAppSelector } from '~/shared/hooks/react-redux';
import { selectIsGameFinished } from '~/features/canvas/slice/selectors';
import { Canvas, Chat, Toolbar } from '~/features/canvas/components';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import ChatIcon from '@mui/icons-material/Chat';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import { t } from 'ttag';

interface PlayingAreaProps {
  isAuthor: boolean;
}

export const PlayingArea: FC<PlayingAreaProps> = ({ isAuthor }) => {
  const isGameFinished = useAppSelector(selectIsGameFinished);
  const canEdit = Boolean(isAuthor && !isGameFinished);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        mb: 2,
        boxShadow: '-5px 5px 30px 5px var(--accent1), 5px -5px 30px 5px var(--accent2)',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChangeTab}
          centered
          allowScrollButtonsMobile
          variant="fullWidth"
        >
          <Tab
            label={t`Split`}
            icon={<VerticalSplitIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            label={t`Canvas`}
            icon={<PhotoCameraBackIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab label={t`Chat`} icon={<ChatIcon fontSize="small" />} iconPosition="start" />
        </Tabs>
      </Box>

      <Box
        className="custom-scroll-horizontal"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          position: 'relative',
          overflowX: Boolean(currentTabIndex === 2) ? 'none' : 'auto',
        }}
      >
        <Box hidden={Boolean(currentTabIndex === 2)}>
          <Canvas canEdit={canEdit} />
        </Box>
        <Box
          hidden={Boolean(currentTabIndex === 1)}
          sx={{ display: Boolean(currentTabIndex === 1) ? 'none' : 'flex', width: '100%' }}
        >
          <Chat isAuthor={isAuthor} />
        </Box>
      </Box>
      {canEdit && currentTabIndex !== 2 && <Toolbar />}
    </Box>
  );
};
