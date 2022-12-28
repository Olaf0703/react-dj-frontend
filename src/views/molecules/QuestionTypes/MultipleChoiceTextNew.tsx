import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { Question } from 'views/atoms/Text/Question';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { TextOption } from 'views/atoms/QuestionOptions/Textoption';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { Store } from 'app/configureStore';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { BlackBoard, QuestionContainer, AnswersContainer, AssistorContainer, TextOptionsList, AnswerContainer, BlockAnswers, ImageAssetContainer, ImageAsset } from './Styles'

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    multipleChoiceAnswerOption: number,
    question: string
  }, isCorrect: boolean) => void;
};

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

export const NewMultipleChoiceText: FC<ChoiceTextProps> = ({
  question,
  nextQuestion,
  totalQuestions,
  questionCounter,
  blockPresentation,
  onAnswer,
}) => {
  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'EN_US'
  const [showAssistor, setShowAssistor] = useState(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const questionSoundURI = `${question.questionAudioUrl}`;

  useEffect(() => {
    setIsAnswered(false);
  }, [question]);

  const readAnswer = (answerOption: any) => {
    const answerSoundURI = `${process.env.REACT_APP_SERVER_URL}${answerOption.answerAudioUrl}`;
    const audio = new Audio(answerSoundURI);
    audio.play();
  };

  const handleAnswer = (result: BlockQuestionInput) => {
    setIsAnswered(true);
    onAnswer({
      question: question.id,
      multipleChoiceAnswerOption: result.answerOption,
    }, result.isCorrect);
    // question: -1,
    // answerOption: answer.id,
    // isCorrect: answer.isCorrect
  };

  const readQuestion = () => {
    const audio = new Audio(questionSoundURI);
    audio.play();
  };

  const closeVideoModal = () => {
    setShowAssistor(!showAssistor);
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
            {question.answerOptions.map((option, i) => (
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
            imageLength={question.questionImageAssets?.length}
          >
            {question.questionImageAssets?.map((item, i) => (
              <ImageAsset key={i} src={item.image} alt='' />
            ))}
          </ImageAssetContainer>
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={ButtonColor.next}
            onClick={nextQuestion}
            disabled={!isAnswered}
            value={
              totalQuestions === questionCounter + 1 ?
                dictionary[language]?.finish :
                dictionary[language]?.next
            }
            fullWidth={true}
            color={BasicColor.black}
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
