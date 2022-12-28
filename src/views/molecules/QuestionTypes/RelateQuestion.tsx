import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAIBlock, IAIQuestion, IRelateAnswerOptionInput } from 'app/entities/block';
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
import { Grid, } from '@mui/material';

type ChoiceTextProps = {
  question: IAIQuestion;
  nextQuestion: () => void;
  totalQuestions: number;
  questionCounter: number;
  blockPresentation: IAIBlock;
  onAnswer: (result: {
    relateAnswerOptions: IRelateAnswerOptionInput[],
    question: string
  }, isCorrect: boolean) => void;
};

interface Item {
  id: number
  isCorrect: boolean
  order: number
  key: string
  value: string
  image: string
}

export const RelateQuestion: FC<ChoiceTextProps> = ({
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
  }
  useEffect(() => {
    stringIds2Numbers()
    console.log(question)
    setIsAnswered(false);
  }, [question]);

  const getCurrentAnswer = () => {
    // const answer = []
    const res: IRelateAnswerOptionInput[] = []
    for (const item of items) {
      // answer.push(item.order)
      res.push({ key: item.key, value: item.value })
    }

    return res
  }

  const handleNextButtonClicked = () => {
    if (isAnswered)
      nextQuestion()
    else {
      setIsAnswered(true)
      const currentAnswer: IRelateAnswerOptionInput[] = getCurrentAnswer()
      onAnswer({
        question: question.id,
        relateAnswerOptions: currentAnswer
      },
        true
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
          cursor: 'pointer'
        }}>{item.key}</TypoGeneralText>
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
            <Grid container spacing={3} justifyContent='center'>
              <Grid item>
                <RLDD
                  items={items}
                  itemRenderer={itemRenderer}
                  onChange={handleRLDDChange}
                />
              </Grid>
              <Grid item>
                {question.answerOptions.map((option) => (
                  <TypoGeneralText
                    key={option.id}
                    style={{
                      color: 'black',
                      background: 'lightGray',
                      border: 'solid 1px yellow',
                      borderRadius: 5,
                      padding: '5px 20px',
                      cursor: 'not-allowed'
                    }}>{option.value}
                  </TypoGeneralText>
                ))}
              </Grid>
            </Grid>
          }
          {/* {items && <RLDD
            items={items}
            itemRenderer={itemRenderer}
            onChange={handleRLDDChange}
          />} */}
        </AnswersContainer>
        <AssistorContainer>
          <Button
            bgColor={!isAnswered ? ButtonColor.login : ButtonColor.next}
            onClick={handleNextButtonClicked}
            // disabled={!isAnswered}
            fullWidth={true}
            value={
              isAnswered ?
                totalQuestions === questionCounter + 1 ?
                  dictionary[language]?.finish :
                  dictionary[language]?.next
                :
                'Check'
            }
            color={BasicColor.black}
          />
          <Icon image={assistor} onClick={readQuestion} />
          <Icon image={videoIcon} onClick={closeVideoModal} />
        </AssistorContainer>
      </BlackBoard>
    </>
  );
};
