import { FC }         from 'react';
import styled         from 'styled-components';
import { Header }     from 'views/atoms/Text/Header';
import { Subheader }  from 'views/atoms/Text/Subheader';
import { ScreenSize } from 'constants/screenSize';

type GreetProps = {
  header: string;
  logo: string;
  classroomIllustration: string;
  greetingIllustration: string;
};

export const Greet: FC<GreetProps> = ({
  header,
  logo,
  classroomIllustration,
  greetingIllustration,
}) => {
  return (
    <div>
      <MobileWelcome>
        <Header isDark={true}>{header}</Header>
      </MobileWelcome>

      <Illustrations>
        <Logo src={logo} alt="Learn with Socrates logo" />
        <ClassroomIlustration
          src={classroomIllustration}
          alt="Classroom Illustratoin"
        />
        <GreetingIlustration
          src={greetingIllustration}
          alt="Teach with student's illustration"
        />
      </Illustrations>
    </div>
  );
};

const MobileWelcome = styled.div`
  padding: 4rem 1rem 2rem 1rem;
  text-align: center;
  @media (min-width: ${ScreenSize.tablet}) {
    display: none;
  }
`;

const Illustrations = styled.div`
  display: none;
  @media (min-width: ${ScreenSize.tablet}) {
    display: unset;
  }
`;

const Logo = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 12rem;
    position: absolute;
    top: 2rem;
    left: 3rem;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    width: 15rem;
    position: absolute;
    top: 3rem;
    left: 8rem;
  }
`;

const ClassroomIlustration = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 55%;
    position: absolute;
    bottom: 2rem;
    left: 3rem;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    display: none;
  }
`;

const GreetingIlustration = styled.img`
  display: none;
  @media (min-width: ${ScreenSize.desktop}) {
    display: unset;
    width: 35%;
    position: absolute;
    bottom: 2rem;
    left: 8rem;
  }
`;
