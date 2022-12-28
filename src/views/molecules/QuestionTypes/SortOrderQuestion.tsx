import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
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
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { Grid } from '@mui/material';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    orderAnswerOptions: string[],
    question: number
  }, isCorrect: boolean) => void;
};

interface Item {
  id: number
  isCorrect: boolean
  order: number
  answerText: string
  image: string
}

export const SortOrderQuestion: FC<ChoiceTextProps> = ({
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
  const [items, setItems] = useState<Array<Item>>([])
  const [answer, setAnswer] = useState<Array<number>>([])
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const questionSoundURI = `${process.env.REACT_APP_SERVER_URL}${question.questionAudioUrl}`;

  const stringIds2Numbers = () => {
    const res = []
    const answer = []
    for (const option of question.answerOptions) {
      res.push({ ...option, id: +option.id })
      answer.push(option.order)
    }
    setItems(res)
    setAnswer(answer.sort())
  }
  useEffect(() => {
    stringIds2Numbers()
    setIsAnswered(false);
  }, [question]);

  const getCurrentAnswer = () => {
    const answer = []
    const res = []
    for (const item of items) {
      answer.push(item.order)
      res.push(item.answerText)
    }

    return { answer: answer, currentAnswer: res }
  }

  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else {
      setIsAnswered(true)
      const currentAnswer = getCurrentAnswer()
      onAnswer({
        question: +question.id,
        orderAnswerOptions: currentAnswer.currentAnswer
      },
        JSON.stringify(currentAnswer.answer) === JSON.stringify(answer)
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
  const itemRenderer = (item: Item): JSX.Element => {
    return (
      <TypoGeneralText
        className='item'
        style={{
          color: 'black',
          background: 'white',
          border: 'solid 1px white',
          borderRadius: 5,
          padding: '5px 20px',
          cursor: 'pointer',
        }}>{item.answerText}</TypoGeneralText>
    );
  };

  const handleRLDDChange = (reorderedItems: Array<Item>) => {
    // console.log('Example.handleRLDDChange');
    setItems(reorderedItems)
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
          {items &&
            <Grid container>
              <RLDD
                layout='vertical'
                items={items}
                itemRenderer={itemRenderer}
                onChange={handleRLDDChange}
              />
            </Grid>
          }
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            // disabled={!isAnswered}
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
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
