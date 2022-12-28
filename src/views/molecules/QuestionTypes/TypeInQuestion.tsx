import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion, ITypeInAnswerOptionInput } from 'app/entities/block';
import { BasicColor, ButtonColor } from 'views/Color';
import { Question } from 'views/atoms/Text/Question';
import { Icon } from 'views/atoms/Icon/Icon';
import videoIcon from 'views/assets/others/video-assistor.png';
import assistor from 'views/assets/text-to-speech.svg';
import { VideoModalAssistor } from 'views/organisms/VideoModalAssistor';
import Button from 'views/molecules/MuiButton';
import { dictionary } from 'views/pages/Student/Question/dictionary'
import { TypoGeneralText } from 'views/atoms/Text';
import { BlackBoard, QuestionContainer, AnswersContainer, AssistorContainer } from './Styles'
import { TextField } from '@mui/material';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    typeInAnswerOption: ITypeInAnswerOptionInput,
    question: string
  }, isCorrect: boolean) => void;
};

export const TypeInQuestion: FC<ChoiceTextProps> = ({
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
  const [typedAnswer, setTypedAnswer] = useState('')
  const [disabled, setDisabled] = useState(false)
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;

  useEffect(() => {
    setIsAnswered(false);
    setTypedAnswer('')
    setDisabled(false)
    console.log('queston:', question)
  }, [question]);

  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else if (typedAnswer) {
      setIsAnswered(true)
      const answer: ITypeInAnswerOptionInput = {
        answerOption: +question.answerOptions[0].id,
        typedAnswer: typedAnswer
      }
      onAnswer({
        question: question.id,
        typeInAnswerOption: answer
      },
        question.answerOptions[0].caseSensitive ?
          typedAnswer === question.answerOptions[0].answerText :
          typedAnswer.toLowerCase() === question.answerOptions[0].answerText.toLowerCase()
      )
    }
  }
  const closeVideoModal = () => {
    setShowAssistor(!showAssistor);
  };

  const readQuestion = () => {
    const audio = new Audio(questionSoundURI);
    audio.play();
  };

  // const readAnswer = (answerOption: any) => {
  //   const answerSoundURI = `${process.env.REACT_APP_SERVER_URL}${answerOption.answerAudioUrl}`;
  //   const audio = new Audio(answerSoundURI);
  //   audio.play();
  // };

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
          {/* <BlockAnswers isAnswered={isAnswered} /> */}
          <TypoGeneralText style={{ color: 'white' }}>
            The answer is
          </TypoGeneralText>
          <TextField
            disabled={disabled}
            sx={{ width: 200 }}
            value={typedAnswer}
            onChange={(e: any) => setTypedAnswer(e.target.value)}
          />
          <TypoGeneralText style={{ color: 'white' }}>
            .
          </TypoGeneralText>
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            fullWidth={true}
            color={BasicColor.black}
            value={
              isAnswered ?
                totalQuestions === questionCounter + 1 ?
                  dictionary[language]?.finish :
                  dictionary[language]?.next
                :
                'Check'
            }
          // value={
          //   totalQuestions === questionCounter + 1 ?
          //     isAnswered ?
          //       dictionary[language]?.finish :
          //       'Check'
          //     : isAnswered ?
          //       dictionary[language]?.next :
          //       'Check'
          // }
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
