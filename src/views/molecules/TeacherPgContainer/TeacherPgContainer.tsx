import { FC, useEffect, ReactChildren, ReactChild } from 'react';
import { ParentPgNav }                              from 'views/molecules/ParentPgNav/ParentPgNav'
import bg_left_img              from 'views/assets/teacher_bg_left.svg'
import bg_right_img             from 'views/assets/teacher_bg_right.svg'
import Menu                     from 'views/pages/Teacher/Menus/TeacherMenu';

import {
  Container,
  BgLeft,
  BgRight,
  Center,
  TeacherTitleBar
} from './Style'

type ParentPgContainerProps = {
  onlyLogoImgNav: boolean;
  title?: string;
  children: ReactChild | ReactChildren;
};

export const TeacherPgContainer: FC<ParentPgContainerProps> = ({onlyLogoImgNav, children=(<></>), title=''}) => {

  useEffect(() => {
    console.log(title)
  }, []);
  return (
    <Container>
        <Menu></Menu>
        <BgLeft src={bg_left_img} />
        <BgRight src={bg_right_img} />
        {/* <ParentPgNav onlyLogoImg={onlyLogoImgNav}/> */}
        {title && <TeacherTitleBar>{title}</TeacherTitleBar>}
        <Center>{children}</Center>
    </Container>
  );
};
