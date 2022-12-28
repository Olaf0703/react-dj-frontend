import { FC, useState } from 'react';
import styled from 'styled-components';
import { ScreenSize } from 'constants/screenSize';
import gem_legendary from 'views/assets/gems_card_collectible/gem_legendary.png';
import gem_epic from 'views/assets/gems_card_collectible/gem_epic.png';
import gem_common from 'views/assets/gems_card_collectible/gem_common.png';
import gem_rare from 'views/assets/gems_card_collectible/gem_rare.png';
import gem_disabled from 'views/assets/gems_card_collectible/gem_disabled.png';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { TypoTitle } from 'views/atoms/Text';

interface GemsProps {
  select: (gemCate: string) => (void)
  actives: Array<boolean>
}

const gems = [
  {
    img: gem_legendary,
    value: 'LEGENDARY',
    description: {
      'EN_US': 'LEGENDARY',
      'TH': 'ตำนาน',
      'ES_MX': 'LEGENDARIA'
    }
  },
  {
    img: gem_epic,
    value: 'EPIC',
    description: {
      'EN_US': 'EPIC',
      'TH': 'มหากาพย์',
      'ES_MX': 'ÉPICA'
    }
  },
  {
    img: gem_rare,
    value: 'RARE',
    description: {
      'EN_US': 'RARE',
      'TH': 'หายาก',
      'ES_MX': 'EXTRAÑA'
    }
  },
  {
    img: gem_common,
    value: 'COMMON',
    description: {
      'EN_US': 'COMMON',
      'TH': 'ทั่วไป',
      'ES_MX': 'COMÚN'
    }
  },
]

export const Gems: FC<GemsProps> = ({ select, actives }) => {
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language.toUpperCase() : 'EN_US'
  const [selected, setSelected] = useState('')

  const onGemClick = (id: number) => {
    const temp = gems[id].description[language as keyof Object].toString()
    setSelected(temp)
    select(gems[id].value)
  }

  return (
    <Grid container justifyContent={'center'}>
      {
        gems.map((gem, index) => (
          <Grid item key={gem.value}>
            <StyledGem onClick={() => onGemClick(index)}>
              <img src={actives[index] ? gem.img : gem_disabled} />
              <p>{gem.description[language as keyof Object]}</p>
            </StyledGem>
          </Grid>
        ))
      }
      <Grid item xs={12}>
        <TypoTitle style={{ textAlign: 'center' }}>{selected}</TypoTitle>
      </Grid>
    </Grid>
  );
};

const StyledGem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  p {
    margin: 0;
    position: absolute;
    top: 45%;
    color: black;
    font-weight: 700;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }

  @media screen and (max-width: ${ScreenSize.tablet}) {
    width: 140px;

    img {
      width: 100%;
    }
  }
`;
