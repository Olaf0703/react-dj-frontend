import { FC, useContext, useEffect }  from 'react';
import { LoadingContext }             from 'react-router-loading';
import { Title }          from 'views/atoms/Text/Title';
import { GameMainMenu }   from 'views/organisms/GameMainMenu';
import { StudentMenu }    from 'views/pages/Student/Menus/StudentMenu';
import { dictionary }     from './dictionary';
import { GamesContainer, GamesTitle, Wrapper } from './Style';
import { useSelector, useDispatch }             from 'react-redux'

export const Games: FC = () => {
  const loadingContext  = useContext(LoadingContext);
  let language:string   = useSelector((state: any) => state.user.language);
  language              = language? language : "EN_US"
  useEffect(() => {
    loadingContext.done();
  }, []);

  return (
    <>
      <Wrapper>
        <StudentMenu>
          <GamesContainer>
            <GamesTitle>
              <Title isDark={true}>{dictionary[language].title}</Title>
            </GamesTitle>
            <GameMainMenu />
          </GamesContainer>
        </StudentMenu>
      </Wrapper>
    </>
  );
};
