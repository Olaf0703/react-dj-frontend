import { FC } from 'react';
import question from 'views/assets/question-mark.svg';
import { ProfileTitle } from 'views/molecules/ProfileTitle';
import creon_img from 'views/assets/badges/creon.svg';
import flask_img from 'views/assets/badges/flask.svg';
import notebook_img from 'views/assets/badges/notebook.svg';
import picture_img from 'views/assets/badges/picture.svg';
import sharpener_img from 'views/assets/badges/sharpener.svg';
import { Avatar, Grid } from '@mui/material';
import useMediaQuery    from '@mui/material/useMediaQuery';
import { ScreenSize }   from 'constants/screenSize';
import {useSelector}    from 'react-redux'
import { dictionary }   from 'views/pages/Student/Settings/dictionary'

export const BadgeContainer: FC = () => {
  const badges = [
    creon_img,
    flask_img,
    notebook_img,
    picture_img,
    sharpener_img,
    question,
    question,
    question,
  ];
  const isMobile = useMediaQuery(`(max-width:${ScreenSize.phone})`);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : "EN_US"
  const size = isMobile ? 40: 120
  return (
    <>
      <ProfileTitle title={dictionary[language]?.badges} />
      <Grid container spacing={2} justifyContent={'center'} sx={{marginBottom: 5, width: '90%'}} >
        {
          badges.map(badge => (
            <Grid item sm={3} sx={{display: 'flex', justifyContent: 'center'}}>
              <Avatar sx={{ width: size, height: size, background: 'white', border: 'gray dashed' }}>
                <img style={{ height: size / 5 * 4 }} src={badge} />
              </Avatar>
            </Grid>)
          )
        }
      </Grid>
    </>
  );
};

