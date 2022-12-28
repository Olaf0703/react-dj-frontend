import { FC, useEffect, useState } from 'react';
import styled                      from 'styled-components';
import { useSelector }             from 'react-redux';
import { IBlockPresentation }      from 'app/entities/block';
import { IQuestion }               from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { ScreenSize }              from 'constants/screenSize';
import { Question }                from 'views/atoms/Text/Question';
import { Icon }                    from 'views/atoms/Icon/Icon';
import videoIcon                   from 'views/assets/others/video-assistor.png';
import assistor                    from 'views/assets/text-to-speech.svg';
import { TextOption }              from 'views/atoms/QuestionOptions/Textoption';
import { VideoModalAssistor }      from 'views/organisms/VideoModalAssistor';
import Button                      from 'views/molecules/MuiButton';
import { Store }                   from 'app/configureStore';
import { dictionary }              from 'views/pages/Student/Question/dictionary'

type ChoiceTextProps = {
  question: IQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IBlockPresentation;
  onAnswer: (result: BlockQuestionInput) => void;
};

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

export const MultipleChoiceText: FC<ChoiceTextProps> = ({
  question,
  nextQuestion,
  totalQuestions,
  questionCounter,
  blockPresentation,
  onAnswer,
}) => {
  const state = useSelector((state: Store) => state.blockPresentation);
  let language:string     = useSelector((state: any) => state.user.language);
  language                = language? language : "EN_US"
  const [showAssistor, setShowAssistor] = useState(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;
  useEffect(() => {
    setIsAnswered(false);
  }, [question.answeroptionSet]);

  const handleAnswer = (result: BlockQuestionInput) => {
    setIsAnswered(true);
    result.question = parseInt(question.id);
    onAnswer(result);
  };

  const closeVideoModal = () => {
    setShowAssistor(!showAssistor);
  };

  const readQuestion = () => {
    const audio = new Audio(questionSoundURI);
    audio.play();
  };

  const readAnswer = (answerOption: any) => {
    const answerSoundURI = `${process.env.REACT_APP_SERVER_URL}${answerOption.answerAudioUrl}`;
    const audio = new Audio(answerSoundURI);
    audio.play();
  };

  return (
    <>
      {(showAssistor && blockPresentation?.block?.topicGrade?.topic?.videoAssistor) ? (
        <VideoModalAssistor
          onClick={closeVideoModal}
          source={
            blockPresentation
              ? blockPresentation?.block?.topicGrade?.topic?.videoAssistor
              : ''
          }
        />
      ) : null}
      <BlackBoard>
        <QuestionContainer>
          <Question>{question.questionText}</Question>
        </QuestionContainer>
        <AnswersContainer>
          <TextOptionsList>
            <BlockAnswers isAnswered={isAnswered} />
            {question.answeroptionSet.map((option, i) => (
              <AnswerContainer key={i}>
                <TextOption
                  answer={option}
                  onClick={handleAnswer}
                />
                <Icon
                  image={assistor}
                  onClick={() => {
                    readAnswer(option);
                  }}
                />
              </AnswerContainer>
            ))}
          </TextOptionsList>
          <ImageAssetContainer
            imageLength={question.questionImageAssets.length}
          >
            {question.questionImageAssets.map((item,i) => (
              <ImageAsset key={i} src={item.image} alt='' />
            ))}
          </ImageAssetContainer>
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={ButtonColor.next}
            onClick={nextQuestion}
            disabled={!isAnswered}
            fullWidth={true}
            color={BasicColor.black}
            value={totalQuestions === questionCounter + 1 ? dictionary[language]?.finish : dictionary[language]?.next}
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal}/>
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};

const BlackBoard = styled.div`
  background-color: #13705f;
  border: 7px solid #5c2100;
  border-radius: 16px;
  @media (min-width: ${ScreenSize.tablet}) {
    margin: 1rem;
    height: auto;
  }
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 100%;
  }
`;
const AnswersContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    flex-direction: row;
    grid-gap: 10px;
  }
`;

const ImageAssetContainer = styled.div<{
  imageLength?: number;
}>`
  display: ${(props: any) => (props.imageLength > 0 ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fit, minmax(110px, 300px));
  justify-content: center;
  width: 100%;
  grid-gap: 10px;
  margin: 10px auto;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    width: 50%;
  }
`;
const ImageAsset = styled.img`
  width: 100%;
`;
const QuestionContainer = styled.div`
  width: 90%;
  margin: 5px auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: ${ScreenSize.desktop}) {
    justify-content: left;
  }
`;
const BlockAnswers = styled.div<{
  isAnswered: boolean;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  padding-left: 5px;
  display: ${props => (props.isAnswered ? 'initial' : 'none')};
`;
const TextOptionsList = styled.div`
  width: 90%;
  margin: 20px auto;
  position: relative;
  text-align: left;
  @media screen and (min-width: ${ScreenSize.desktop}) {
    height: 50%;
    margin: 20px auto;
    width: 70%;
  }
`;

const AssistorContainer = styled.div`
  width: 95%;
  max-width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 30px auto;
`;
const AnswerContainer = styled.div`
  display: flex;
  justify-content: center;
`;
