import { FC, useEffect, ReactChildren, ReactChild } from 'react';
import { ParentPgNav } from 'views/molecules/ParentPgNav/ParentPgNav'
import bg_left_img from 'views/assets/teacher_bg_left.svg'
import bg_right_img from 'views/assets/teacher_bg_right.svg'
import { ThemeProvider } from '@mui/material';
import { settingPage } from 'views/molecules/Setting/utils/Theme';

import {
  Container,
  BgLeft,
  BgRight,
} from './Style'
import { ParentPageTitle } from '../PageTitle';

type ParentPgContainerProps = {
  onlyLogoImgNav: boolean;
  title?: string;
  children: ReactChild | ReactChildren;
};

export const TeacherSettingPgContainer: FC<ParentPgContainerProps> = ({ onlyLogoImgNav, children = (<></>), title = '' }) => {

  return (
    <Container>
      <ThemeProvider theme={settingPage}>
        <BgLeft src={bg_left_img} />
        <BgRight src={bg_right_img} />
        <ParentPgNav onlyLogoImg={onlyLogoImgNav} />
        {
          title && <ParentPageTitle title={title} />
        }
        {children}
      </ThemeProvider>
    </Container>
  );
};
