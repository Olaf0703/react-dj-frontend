import { FC }      from 'react';
import styled      from 'styled-components';
import blueRibbon  from 'views/assets/blue-ribbon.svg'
import crocoGirl   from 'views/assets/croco-girl.svg'
import { LSTitle } from 'views/molecules/Setting/utils/Style';

export const IconTitle: FC = () => {
  return (
    <>
      <Background><BadgeIcon src = {crocoGirl}/><LSTitle ml={-90}>{'Sophie Turner'}</LSTitle></Background>
    </>
  );
};

const BadgeIcon = styled.img`
position: relative;
left: -120px;
margin: 0;
`

const Background = styled.div`
  font-weight: 700;
  color: white;
  width: 376px;
  height: 81px;
  position: relative;
  background: url(${blueRibbon}) no-repeat center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
`;
