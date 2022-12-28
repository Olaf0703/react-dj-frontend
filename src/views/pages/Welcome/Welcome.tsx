import { FC, useState, useEffect } from 'react';
import logo                 from 'views/assets/socrates-logo.svg';
import { Header }           from 'views/atoms/Text/Header';
import { Subheader }        from 'views/atoms/Text/Subheader';
import welcome              from 'views/assets/welcome-page.svg';
import { Button }           from 'views/molecules/Button';
import { ButtonColor, BasicColor }      from 'views/Color';
import { TypoIcon }         from 'views/atoms/Text';
import { dictionary }       from 'views/pages/Welcome/dictionary';
import { Modal }            from 'views/atoms/Modal';
import { Link, useHistory } from 'react-router-dom';
import { resetReducer }     from 'app/actions/userActions';
import { useDispatch }      from 'react-redux';
import { useSelector }      from 'react-redux';

import {
  Wrapper,
  Logo,
  Body,
  Description,
  Illustration,
  Actions,
  SigninActions,
  SignupActions,
  Legal,
  ModalContent,
  ModalStyles,
  ModalItemsContainer,
} from './Style';
import { TextInput } from '../../atoms/Text/TextInput';
export const Welcome: FC = () => {
  const [joinModal, setJoinModal] = useState(false);
  const [deployModal] = useState(false);
  const history       = useHistory();
  const dispatch      = useDispatch();
  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language.toUpperCase() : 'EN_US'

  const sendEmail     = () => {
    setJoinModal(!joinModal);
  };

  useEffect(() => {
    resetReducer(dispatch);
  }, []);

  return (
    <Wrapper>
      <Logo src={logo} alt='Learn with Socrates logo' />
      {deployModal ? (
        <Modal>
          <ModalContent>
            <ModalStyles>
              {joinModal ? (
                <ModalItemsContainer>
                  <Subheader>
                    Congratulations now you are part of SOCRATES!
                  </Subheader>
                  <Subheader>Check yout email</Subheader>
                </ModalItemsContainer>
              ) : (
                <ModalItemsContainer>
                  <Subheader>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </Subheader>
                  <TextInput label={'email'} />
                  <Button
                    onClick={sendEmail}
                    value={dictionary[language].join}
                    color={ButtonColor.join}
                    darkText={true}
                  />
                </ModalItemsContainer>
              )}
            </ModalStyles>
          </ModalContent>
        </Modal>
      ) : null}
      <Body>
        <Header isDark={true}>{dictionary[language].practice}</Header>
        <Description>
          <Subheader isDark={true}>
            {dictionary[language].description1}
          </Subheader>
          <Subheader isDark={true}>
            {dictionary[language].description2}
          </Subheader>
        </Description>
      </Body>

      <Illustration src={welcome} alt=''/>

      <Actions>
        <SignupActions>
          <Button
            value    ={dictionary[language].schoolSignUp}
            color    ={BasicColor.blue}
            darkText ={true}
            style    ={{width: 'unset'}}
            onClick  ={() => history.push('/teacher/selectCreateType')}
          />
          <Button
            value    ={dictionary[language].parentSignUp}
            color    ={ButtonColor.join}
            darkText ={true}
            style    ={{width: 'unset'}}
            onClick  ={() => history.push('/parent/create')}
          />
        </SignupActions>
        <SigninActions>
          <Button
            value={dictionary[language].login}
            color={ButtonColor.login}
            style    ={{width: 'unset'}}
            onClick={() => history.push('/login')}
          />
        </SigninActions>
      </Actions>

      <Legal>
        <TypoIcon onClick={() => location.href='https://www.WithSocrates.com'}>
          {dictionary[language].about}
        </TypoIcon >
        <TypoIcon onClick={() => location.href='https://www.withsocrates.com/privacy-policy/'} >
          {dictionary[language].privacy}
        </TypoIcon >
        <TypoIcon onClick={() => location.href='https://www.withsocrates.com/terms-conditions/'} >
          {dictionary[language].termAndConditions}
        </TypoIcon >
        <TypoIcon onClick={() => location.href='https://www.learnwithsocrates.com/index.php/main/policy/children_privacy/en'} >
          {dictionary[language].children_privacy}
        </TypoIcon >
      </Legal>
    </Wrapper>
  );
};
