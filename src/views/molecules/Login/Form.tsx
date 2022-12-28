import { FC } from 'react';
import styled from 'styled-components';
import { GeneralText } from 'views/atoms/Text/GeneralText';
import { Link } from 'views/atoms/Text/Link';
// import { TextInput }   from 'views/atoms/Text/TextInput';
import { ScreenSize } from 'constants/screenSize';
import { Stack, TextField } from '@mui/material';

type FormProps = {
  login: string;
  emailLabel: string;
  password: string;
  passwordValidator?: (str: string) => boolean;
  wrongPasswordMessage?: string;
  forgot: string;
  setUsername: (str: string) => void;
  setPassword: (str: string) => void;
};

export const Form: FC<FormProps> = ({
  login,
  emailLabel,
  password,
  passwordValidator,
  wrongPasswordMessage,
  forgot,
  setUsername,
  setPassword
}) => {
  const handleForgot = () => {
    location.href = `${process.env.REACT_APP_SERVER_URL}password_reset/`
  }
  return (
    <>
      <StyledForm>
        <Field>
          <GeneralText>{login}</GeneralText>
        </Field>
        <StyledTextField
          onChange={(e) => setUsername(e.target.value)}
          label={emailLabel}
          type='email'
        />
        <StyledTextField
          onChange={(e) => setPassword(e.target.value)}
          label={password}
          type='password'
        />


        {/* <Field>
          <TextInput label={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field> */}
        {/*
        <Field>
          <TextInput
            label={password}
            validate={passwordValidator}
            errMsg={wrongPasswordMessage}
            isSecret={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field> */}
        <Stack direction={'row'}>
          <Link onClick={handleForgot} style={{cursor: 'pointer'}}>{forgot}</Link>
        </Stack>
      </StyledForm>
    </>
  );
};

const StyledForm = styled.div`
  display       : flex;
  flex-direction: column;
  gap           : 10px;
  @media (min-width: ${ScreenSize.desktop}) {
    // all: unset;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  border: none;

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-root  {
    border-radius: 10px;
  }
  & .MuiOutlinedInput-input  {
    border-radius: 10px;
    background: white;
  }
  & .MuiFormLabel-root {
    top: 5px;
  }
`;

const Field = styled.div`
  margin-top: 11px;
  margin-bottom: 11px;
`;
