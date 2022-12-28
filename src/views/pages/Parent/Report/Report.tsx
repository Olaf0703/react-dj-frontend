import { FC, useEffect, useContext }  from 'react';
import { Box, Grid }                  from '@mui/material';
import { ParentPgContainer }          from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { LSCheckboxList }             from 'views/molecules/Report/CheckList';
import { IconTitle }                  from 'views/molecules/Report/IconTitle';
import { SocratesLine }               from 'views/molecules/Report/Line';
import { SocratesPie }                from 'views/molecules/Report/Pie';
import { LSLabel, LSShadowContainer } from 'views/molecules/Setting/utils/Style';
import { LSCalendarComponent }        from 'views/molecules/Report/Calendar';
import { ReportProgress }             from 'views/molecules/Report/Progress';
import { LoadingContext }             from 'react-router-loading';

export const Report: FC = () => {
  const loadingContext = useContext(LoadingContext);

  useEffect(() => {

    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

    loadingContext.done();
  }, []);
  return (
    <ParentPgContainer onlyLogoImgNav={false}>
      <Box sx={{display: 'flex', flexDirection: 'row', width: 1600}}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box>
              <IconTitle />
              <LSShadowContainer>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Box
                    sx={{
                      display        : 'flex',
                      paddingLeft    : '30px',
                      flexDirection  : 'column',
                      justifyContent : 'center',
                    }}
                  >
                    <LSLabel mb={0} color="#21B95C" fontSize={32}>
                      {'20'}
                      <span style={{fontSize: 22, color: 'black', margin: 0}}>
                        {'/28'}
                      </span>
                    </LSLabel>
                    <LSLabel mt={0}>{'DAYS PRACTICING'}</LSLabel>
                  </Box>
                  <LSCalendarComponent />
                </Box>
                <ReportProgress />
              </LSShadowContainer>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <LSShadowContainer display="flex" justifyContent="space-evenly">
                <SocratesLine />
                <SocratesPie />
              </LSShadowContainer>
              <LSShadowContainer>
                <LSCheckboxList />
              </LSShadowContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ParentPgContainer>
  );
};
export default Report;
