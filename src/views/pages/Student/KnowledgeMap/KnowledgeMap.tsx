import { FC, useEffect, useContext, useState }  from 'react';
import { useSelector }                     from 'react-redux';
import { LoadingContext }   from 'react-router-loading';
import { useHistory }       from 'react-router-dom';

import { StudentMenu }  from 'views/pages/Student/Menus/StudentMenu';
import boat_sound       from 'views/assets/audios/boat.mp3';
import boat             from 'views/assets/islands/fillers/boat.svg';
import barrell          from 'views/assets/islands/fillers/barril.svg';
import dragon           from 'views/assets/islands/fillers/dragon.svg';
import isle             from 'views/assets/islands/fillers/island.svg';
import rock             from 'views/assets/islands/fillers/rock.svg';
import rock2            from 'views/assets/islands/fillers/rock-2.svg';
import boulder          from 'views/assets/islands/fillers/rocxk.svg';
// import background       from 'views/assets/colored-shapes-bg.svg';


import {
  Wrapper,
  Boat,
  Ocean,
  Island,
  Filler,
  Subject
} from './Styles';

export const KnowledgeMap: FC = () => {
  const loadingContext  = useContext(LoadingContext);
  const history         = useHistory();
  const student         = useSelector((state: any) => state.student);

  const [areasOfKnowledge,  setAreasOfKnowledge]  = useState([]);
  const [loadedImgNum,      setLoadedImgNum]      = useState(0)
  const [boatX,             setBoatX]             = useState(window.innerWidth / 2)
  const [boatY,             setBoatY]             = useState(window.innerHeight / 2)

  const onImgLoad       = () => {

    setLoadedImgNum(loadedImgNum + 1)
    if (loadedImgNum >= areasOfKnowledge.length - 1)
      loadingContext.done();

  }

  const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

  const animateBoat     = (e: any, route: string) => {

    const audio = new Audio(boat_sound);
    audio.play();

    setBoatX(e.clientX )
    setBoatY(e.clientY + window.pageYOffset )

    setTimeout(() => {
      history.push(route);
    }, 3300);

  };

  const randRange       = (max: number, min: number) => Math.round(Math.random() * (max - min)) + min;

  const getFiller       = () => {

    const uniqueFillers = [boat, barrell, dragon];
    const fillers       = [isle, rock, boulder, rock2];
    if (getRandomNumber(8) === 8) {
      return uniqueFillers[getRandomNumber(2)];
    }
    return fillers[getRandomNumber(3)];

  };

  const dragonNum       = randRange(0, areasOfKnowledge.length);

  useEffect(() => {
    // setBoatX(window.innerWi / )
    setAreasOfKnowledge(student?.guardianstudentplan?.subject);
  }, []);

  return (
    <Wrapper>
      <StudentMenu>
        <Boat src={boat} style={{position: 'absolute', left: boatX - 100, top: boatY - 100}}/>
        <Ocean >
          {areasOfKnowledge.map(
            (
              areaOfKnowledge: {
                id:          number;
                islandImage: string;
                isActive:    boolean;
              },
              i
              ) => {
                const fill = getFiller();

                return i % 2 === 0 ? (
                  <Subject key={i}
                >
                  <Island
                    src     = {`${process.env.REACT_APP_SERVER_URL}media/${areaOfKnowledge.islandImage}`}
                    isActive= {areaOfKnowledge.isActive}
                    onLoad  = {onImgLoad}
                    onError = {onImgLoad}
                    onClick = {e => {
                      animateBoat(e, `/question/AI/${areaOfKnowledge.id}`);
                    }}
                  />
                  <>
                    {i === dragonNum ? <Filler src={dragon} /> : null}
                    <Filler src={fill} />
                    {i % 3 === 0 ? <Filler src={fill} /> : null}
                  </>
                </Subject>
              ) : (
                <div key={i}>
                  {i === dragonNum ? <Filler src={dragon} /> : null}
                  <Island
                    src     = {`${process.env.REACT_APP_SERVER_URL}media/${areaOfKnowledge.islandImage}`}
                    isActive= {areaOfKnowledge.isActive}
                    onLoad  = {onImgLoad}
                    onError = {onImgLoad}
                    onClick = {e => {
                      animateBoat(e, `/question/AI/${areaOfKnowledge.id}`);
                    }}
                  />
                  {i % 5 === 0 ? <Filler src={fill} /> : null}
                </div>
              );
            }
          )}
        </Ocean>
      </StudentMenu>
    </Wrapper>
  );
};
