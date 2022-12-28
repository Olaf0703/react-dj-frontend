import { FC, useEffect, useState, useContext } from 'react';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar }    from 'notistack';
import { useHistory }     from 'react-router-dom';
import { useDispatch, useSelector }    from 'react-redux';
import Grid               from '@mui/material/Grid';
import Button             from 'views/molecules/MuiButton';
import TextField                from 'views/molecules/MuiTextField';
import { BasicColor }           from 'views/Color';
import { ParentPgContainer }    from 'views/molecules/ParentPgContainer/ParentPgContainer';
import { ParentPgStepper }      from 'views/molecules/ParentPgStepper/ParentPgStepper';
import SocratesImg              from 'views/assets/socrates.svg';
import { createGuardian }       from 'app/actions/guardianActions'
import { Button as ButtonText } from 'views/atoms/Text/Button';
import { dictionary }           from './dictionary';
import {
  Container,
  FormContainer,
  ContactContainer,
  Title,
  ContactHeader,
  ContactBody,
} from './Style';
import commonDictionary                           from 'constants/commonDictionary'

const CreateParent: FC = () => {
  const loadingContext                = useContext(LoadingContext);
  const history                       = useHistory();
  const dispatch                      = useDispatch();
  const {enqueueSnackbar}             = useSnackbar();
  const [userName, setUserName]       = useState('');
  const [password, setPassword]       = useState('');
  const [email, setEmail]             = useState('');
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  // const [confPassword, setConfPassword] = useState('');
  const [validateMsg, setValidateMsg] = useState<{[key: string]: any}>({
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    password: null,
    confPassword: null,
  });
  // const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading]       = useState(false);
  const [couponCode, setCouponCode] = useState('');

  let language:string = useSelector((state: any) => state.user.language);
  language            = language? language : 'EN_US'

  function validateEmail (email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  useEffect(() => {
    if(window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();
    loadingContext.done()
  }, [])

  const handleFormChange = (field: string, errMsg: string) => {
    setValidateMsg({...validateMsg, [field]: errMsg});
  };

  const handleCreate = async () => {
    if (!formValidation()) return;

    setLoading(true);
    const result: any = await createGuardian(email, firstName, lastName, userName, password,couponCode, dispatch)
    /*------------------------ free account for first releae -S-------------------------*
    const result: any = await createGuardian(email, firstName, lastName, userName, password,'FREE', dispatch)
    /*------------------------ free account for first releae -E-------------------------*/

    setLoading(false);

    if(!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return;
    }
    history.push('/parent/payment');

  };

  const formValidation = () => {
    const validateMsgTemp = {...validateMsg};
    let valiResult = true;
    for (const key in validateMsg) {
      if (validateMsg[key] === null) {
        validateMsgTemp[key] = commonDictionary[language]?.fieldIsRequired;
      }
      if (validateMsgTemp[key]) valiResult = false;
    }
    setValidateMsg(validateMsgTemp);
    return valiResult;
  };

  // useEffect(() => {
  //   if (!errMsg) return;
  // }, [errMsg]);

  return (
    <ParentPgContainer onlyLogoImgNav={true}>
      <>
        <ParentPgStepper step={1} />
        <Container>
          <FormContainer>
            <Title>{dictionary[language]?.parentSignup}</Title>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.email}
                  onChange={e => {
                    setEmail(e.target.value);
                    // handleFormChange(
                    //   'email',
                    //   e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : !validateEmail(e.target.value) ? 'This is not email address' : ''
                    // );
                    /*------------- set username to email -S--------------------------*/
                    setUserName(e.target.value);
                    setValidateMsg({...validateMsg,
                      email: e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : !validateEmail(e.target.value) ? dictionary[language]?.thisIsNotEmailAddress : '',
                      userName: ''
                    });
                    /*------------- set username to email -E--------------------------*/

                  }}
                  error={!!validateMsg.email}
                  helperText={validateMsg.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.parentFirstName}
                  onChange={e => {
                    setFirstName(e.target.value);
                    handleFormChange(
                      'firstName',
                      e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.firstName}
                  helperText={validateMsg.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.parentLastName}
                  onChange={e => {
                    setLastName(e.target.value);
                    handleFormChange(
                      'lastName',
                      e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.lastName}
                  helperText={validateMsg.lastName}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  label='Parent Username'
                  onChange={e => {
                    setUserName(e.target.value);
                    handleFormChange(
                      'userName',
                      e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.userName}
                  helperText={validateMsg.userName}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.password}
                  type='password'
                  onChange={e => {
                    setPassword(e.target.value);
                    handleFormChange(
                      'password',
                      e.target.value.length === 0 ? dictionary[language]?.fieldIsRequired : ''
                    );
                  }}
                  error={!!validateMsg.password}
                  helperText={validateMsg.password}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label={dictionary[language]?.confirmPassword}
                  type='password'
                  onChange={e => {
                    // setConfPassword(e.target.value);
                    handleFormChange(
                      'confPassword',
                      e.target.value.length === 0
                        ? dictionary[language]?.fieldIsRequired
                        : password !== e.target.value
                        ? dictionary[language]?.passwordIsNotMatchedWithConfirmPassword
                        : ''
                    );
                  }}
                  error={!!validateMsg.confPassword}
                  helperText={validateMsg.confPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={dictionary[language]?.couponCode}
                  onChange={e => {
                    setCouponCode(e.target.value);
                  }}
                  value={couponCode}
                  type='special code'
                />
              </Grid>
            </Grid>
            <div className='flex'>
              <Button
                bgColor={BasicColor.green}
                onClick={handleCreate}
                value={dictionary[language]?.createAccount}
                margin='45px 0 0 0'
                loading={loading}
              />
            </div>
            <div className='p-b-95 p-t-30 font-s-15 inline'>
              {dictionary[language]?.byClickingCreateAccountYouAgreeToLearnWithSocrates}{' '}
              <div className='font-w-9 inline'>
                {dictionary[language]?.privacyPolicy}, {dictionary[language]?.termsAndConditions}
              </div>{' '}
              {dictionary[language]?.and} <div className='font-w-9 inline'>{dictionary[language]?.childrenPrivacyPolicy}</div>
            </div>
          </FormContainer>
          <ContactContainer>
            <ContactHeader>
              <img src={SocratesImg} className='p-l-20 p-r-10' />
              <div className='font-s-60 line-h-75 font-w-6 text-center p-r-25'>
              {dictionary[language]?.welcome} <br />
              {dictionary[language]?.toSocrates}
              </div>
            </ContactHeader>
            <ContactBody>
              <div className='font-w-8 font-s-30 line-h-35 p-b-25'>
                {dictionary[language]?.contactUs}
              </div>
              <div className='flex-col'>
                <div className='font-w-7 font-s-35 p-b-20'>
                  {dictionary[language]?.weAreHappyToHelpYou}
                </div>
                <div className='flex justify-space-between'>
                  <ButtonText className='p-1-10' onClick={() => location.href='https://www.withsocrates.com/contact/'}>{dictionary[language]?.contactUs}</ButtonText>
                  <ButtonText onClick={() => location.href='https://www.withsocrates.com/faq/'}>{dictionary[language]?.FAQ}</ButtonText>
                  <ButtonText className='p-r-10' onClick={() => location.href='https://www.withsocrates.com/membership/'}>{dictionary[language]?.plans}</ButtonText>
                </div>
              </div>
            </ContactBody>
          </ContactContainer>
        </Container>
      </>
    </ParentPgContainer>
  );
};
export default CreateParent;
