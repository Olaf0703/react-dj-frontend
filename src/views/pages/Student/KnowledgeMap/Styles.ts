import styled from 'styled-components';
import { ScreenSize }   from 'constants/screenSize';
import background       from 'views/assets/colored-shapes-bg.svg';
import ocean            from 'views/assets/islands/ocean.svg';

export const Wrapper = styled.div`
  background-image  : url(${background});
  background-repeat : no-repeat;
  background-size   : cover;
`;

export const Boat = styled.img`
  z-index    : 1;
  position   : absolute;
  top        : ${window.innerHeight / 2}px;
  left       : ${window.innerWidth / 2}px;
  height     : 140px;
  transition : top 6s, left 4s;
  @media (min-width: ${ScreenSize.desktop}) {
    height: 280px;
  }
`;

export const Ocean = styled.div`
  padding               : 1rem;
  display               : grid;
  grid-template-columns : 60% 40%;
  min-height            : 100vh;
  background-image      : url(${ocean});
  background-repeat     : no-repeat;
  background-size       : cover;
  margin-left           : auto;
  margin-right          : auto;
  @media (min-width: ${ScreenSize.desktop}) {
    min-height            : unset;
    margin-top            : 65px;
    padding               : 2rem;
    padding-top           : 3em;
    padding-bottom        : 3em;
    display               : grid;
    margin-left           : -90px;
    margin-right          : -90px;
    grid-template-columns : 60% 40%;
  }
`;

export const Island = styled.img<{
  isActive: boolean;
}>`
  width          : 100%;
  opacity        : ${props => (props.isActive ? 1 : 0.5)};
  pointer-events : ${props => (props.isActive ? 'all' : 'none')};
  margin-left    : auto;
  margin-right   : auto;
  display        : block;
  margin-left    : auto;
  margin-right   : auto;
  margin-top     : 4rem;
  cursor         : pointer;
  &:hover {
    transform: scale(1.1);
  }
  @media (min-width: ${ScreenSize.tablet}) {
    width: 30vw;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    width: unset;
  }
`;

export const Filler = styled.img`
  width: 60%;
  @media (min-width: ${ScreenSize.tablet}) {
    width: 15vw;
  }
  @media (min-width: ${ScreenSize.desktop}) {
    width: unset;
  }
`;

export const Subject = styled.div`
  display               : grid;
  grid-template-columns : 70% 30%;
`;

