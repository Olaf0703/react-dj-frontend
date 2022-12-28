import { FC }         from 'react';
import styled         from 'styled-components';
import { ScreenSize } from 'constants/screenSize';

type ChoiceImagetProps = {
  options: {image: string}[];
};

export const MultipleChoiceImage: FC<ChoiceImagetProps> = ({options}) => {
  return (
    <>
      <Options>
        {options.map((option, i) => (
          <OptionWrapper key={i}>
            <Option src={option.image} />
          </OptionWrapper>
        ))}
      </Options>
    </>
  );
};

const Options = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (min-width: ${ScreenSize.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const OptionWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
`;

export const Option = styled.img`
  @media (min-width: ${ScreenSize.tablet}) {
    width: 8rem;
  }
`;
