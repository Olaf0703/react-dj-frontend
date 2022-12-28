import { FC, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { LessonProgress } from 'views/molecules/LessonProgress/LessonProgress';
import { useParams } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import {
  Container,
  Wrapper,
  ProgressWrapper,
} from './Style';
import { FinishLesson } from 'views/organisms/FinishLesson';
import { StudentMenu } from 'views/pages/Student/Menus/StudentMenu';
import { LevelUpDgContent } from 'views/atoms/ParticlgBg';
import { CardDialog } from 'views/molecules/StudentCard/MyCards/CardDialog';
import { createNewAiBlock, newFinishBlock } from 'app/actions/blockActions';
import { IAIBlock, IAIQuestion } from 'app/entities/block';
import { Store } from 'app/configureStore';
import * as TYPE from 'app/types';
import { getNextLevel } from 'app/actions/userActions';
import { QUESTION_POINT_UNIT } from 'constants/common';
import { NewMultipleChoiceText } from 'views/molecules/QuestionTypes/MultipleChoiceTextNew';
import { MultipleSelectQuestion } from 'views/molecules/QuestionTypes/MultipleSelectQuestion';
import { SortOrderQuestion } from 'views/molecules/QuestionTypes/SortOrderQuestion';
import { RelateQuestion } from 'views/molecules/QuestionTypes/RelateQuestion';
import { TypeInQuestion } from 'views/molecules/QuestionTypes/TypeInQuestion';
import useSound from 'use-sound';
import audioCheck from 'views/assets/audios/correct-winning-sound.wav';
import audioError from 'views/assets/audios/wrong-answer-sound.wav';
import { LoadingSpinner } from 'views/atoms/Spinner';
import * as TYPES from 'app/types'

interface RoutePresentationParams {
  mode: string;
  aokId: string;       //Area of Knowledge Id on AI or Path mode, BlockPresentationId on BlockID mode
}

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

const EXP_UNIT = 5;

export const AIQuestion: FC = () => {

  const [playHit] = useSound(audioCheck);
  const [playError] = useSound(audioError);
  const earning = useSelector((state: any) => state.earning);
  const user = useSelector((state: any) => state.user);
  const student = useSelector((state: any) => state.student)
  const state = useSelector((state: Store) => state);
  const loadingContext = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { aokId } = useParams<RoutePresentationParams>();
  const [aiBlock, setAiBlock] = useState<IAIBlock>();
  const [questions, setQuestions] = useState<Array<IAIQuestion>>();
  const [answers, setAnswers] = useState<Array<any>>([])
  const [hits, setHits] = useState(0)
  const [errors, setErrors] = useState(0)
  const [prevHit, setPrevHit] = useState<boolean>(earning.energyCharge > 0 ? true : false)
  const [questionCounter, setQuestionCounter] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [answerResult, setAnswerResult] = useState<boolean[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false)
  const [nextMaxExp, setNextMaxExp] = useState(0)
  const [openDg, setOpenDg] = useState(false);
  const [bonusCoins, setBonusCoins] = useState(0)


  const renderQuestion = (
    question: IAIQuestion,
    block: IAIBlock,
    length: number
  ) => {
    let component: any
    switch (question.questionType) {
      case 'MC':
        component = (
          <NewMultipleChoiceText
            question={question}
            nextQuestion={handleNextQuestion}
            totalQuestions={length}
            questionCounter={questionCounter}
            onAnswer={onAnswer}
            blockPresentation={block}
          />
        )
        break
      case 'MS':
        component = (
          <MultipleSelectQuestion
            question={question}
            nextQuestion={handleNextQuestion}
            totalQuestions={length}
            questionCounter={questionCounter}
            onAnswer={onAnswer}
            blockPresentation={block}
          />
        )
        break
      case 'O':
        component = (
          <SortOrderQuestion
            question={question}
            nextQuestion={handleNextQuestion}
            totalQuestions={length}
            questionCounter={questionCounter}
            onAnswer={onAnswer}
            blockPresentation={block}
          />
        )
        break
      case 'R':
        component = (
          <RelateQuestion
            question={question}
            nextQuestion={handleNextQuestion}
            totalQuestions={length}
            questionCounter={questionCounter}
            onAnswer={onAnswer}
            blockPresentation={block}
          />
        )
        break
      case 'T':
        component = (
          <TypeInQuestion
            question={question}
            nextQuestion={handleNextQuestion}
            totalQuestions={length}
            questionCounter={questionCounter}
            onAnswer={onAnswer}
            blockPresentation={block}
          />
        )
        break
      default:
        break

    }
    return component
  }

  const updateNextLevel = async (currentLevelAmount: number) => {
    const res: any = await getNextLevel(currentLevelAmount, user.token, dispatch)
    if (res.msg) setNextMaxExp(earning.expMax)
    else setNextMaxExp(res)
  }

  const onAnswer = (result: any, isCorrect: boolean) => {

    increaseExp(isCorrect);
    setAnswers([...answers, result]);
    setAnswerResult([...answerResult, isCorrect])
    isCorrect ? setHits(hits + 1) : setErrors(errors + 1)
    isCorrect ? playHit() : playError()
    setPrevHit(isCorrect)
    if (isCorrect) {
      setPoints(points + QUESTION_POINT_UNIT);
    }

    upgradeEnergy(isCorrect)
  };

  const increaseExp = async (isCorrect: boolean) => {
    const currentExp = earning.exp + (isCorrect ? EXP_UNIT : 1);
    const expMax = earning.expMax

    if (currentExp > expMax) {
      dispatch({ type: TYPE.EXP_UPDATE, payload: { exp: currentExp - expMax, expMax: nextMaxExp } });
      dispatch({ type: TYPE.EXP_LEVEL_UP });
      congratulations();

      const nextLevelMax: any = await updateNextLevel(earning.level)
      if (nextLevelMax.msg) {
        console.log(nextLevelMax.msg)
      } else setNextMaxExp(nextLevelMax)
    } else dispatch({ type: TYPE.EXP_UPDATE, payload: { exp: currentExp, expMax: expMax } });
  };

  // Open Congratulations dialog when user passes the max exp of current level.
  const congratulations = () => {
    setOpenDg(!openDg);
  };

  const upgradeEnergy = (isCorrect: boolean) => {

    if (isCorrect) {
      if (prevHit) {
        setBonusCoins(bonusCoins + (earning.energyCharge > 9 ? 10 : ((earning.energyCharge + 1))))
        dispatch({ type: TYPE.EARNING_ENERGY_UP });
      }
    }
    else {
      dispatch({ type: TYPE.EARNING_ENERGY_RESET });
    }
    console.log('bonus coins is ', bonusCoins)
  };

  const setQuestionsInAI = async (mounted: boolean) => {
    const res: any = await createNewAiBlock(
      parseInt(aokId),    //11
      student.id, //15
      user.token,
    );
    if (!res.success) {
      enqueueSnackbar(res.msg, { variant: 'error' });
      return false;
    }
    if (mounted) {
      setAiBlock(res)
      setQuestions(res.block.questions)
      loadingContext.done()
    }
    return true;
  }

  const onNextLesson = () => {
    setQuestionCounter(0);
    setIsLessonFinished(false)
    setAnswerResult([]);
    setQuestions([])
    setPoints(0)
    setBonusCoins(0)
    setQuestionsInAI(true)
  }

  const any2String = (param: any): string => {
    let str = ''
    if (Array.isArray(param)) {
      str += '['
      for (let i = 0; i < param.length; i++) {
        if (i === param.length - 1)
          str += any2String(param[i])
        else
          str += (any2String(param[i]) + ',')
      }
      str += ']'
    } else if (typeof param !== 'string' && typeof param !== 'number') {
      str += '{'
      const keys = Object.keys(param)
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1)
          str += (keys[i] + ':' + any2String(param[keys[i]]))
        else
          str += (keys[i] + ':' + any2String(param[keys[i]]) + ',')
      }
      str += '}'
      // let stringifiedObj = Object.entries(param).map(x => x.join(':')).join('\n')
    } else str = '"' + param.toString() + '"'
    return str
  }

  const handleNextQuestion = async () => {
    if (questions && aiBlock) {
      if (questions.length - 1 > questionCounter) {
        setQuestionCounter(questionCounter + 1);

      } else {
        setIsLessonFinished(true)
        setLoading(true)
        const res = await newFinishBlock(aiBlock.id, earning.energyCharge, hits, errors, bonusCoins, any2String(answers), state.earning, user.token, dispatch)
        if (res.success) {
          console.log('success')
          dispatch({
            type: TYPES.EARNING_COIN_UP, payload: 100 + bonusCoins
          })
        }
        setLoading(false)
      }
    }
  };

  useEffect(() => {

    setNextMaxExp(student.nextLevel.pointsRequired)
    setAnswers([])
    let mounted = true
    setQuestionsInAI(mounted)
    setIsLessonFinished(false)

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Wrapper>
      <StudentMenu>
        {
          isLessonFinished ? (
            <FinishLesson
              loading={loading}
              tokens={points}
              energy={bonusCoins}
              onNextLesson={onNextLesson}
            />
          ) : aiBlock && questions?.length ? (
            <>
              <ProgressWrapper id='lesson-progress'>
                <LessonProgress
                  currentQuestion={questionCounter}
                  topic={aiBlock.block.topicGrade.topic.name}
                  totalQuestions={questions.length}
                  questions={questions}
                  answerResult={answerResult}
                  combocount={state.earning.energyCharge}
                />
              </ProgressWrapper>
              <CardDialog
                isOpen={openDg}
                open={congratulations}
                dialogContent={<LevelUpDgContent close={congratulations} />}
                fullWidth="true"
              />
              <Container id="container">
                {renderQuestion(
                  questions[questionCounter],
                  aiBlock,
                  questions.length
                )}
              </Container>
            </>
          ) : null
        }
      </StudentMenu>
    </Wrapper>
  );
};
