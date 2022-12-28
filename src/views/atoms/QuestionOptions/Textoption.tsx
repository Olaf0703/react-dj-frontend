import { Typography } from '../Text/typography';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicColor } from 'views/Color';
import { ScreenSize } from 'constants/screenSize';
import audioCheck from 'views/assets/audios/correct-winning-sound.wav';
import audioError from 'views/assets/audios/wrong-answer-sound.wav';
import { TypoGeneralText } from '../Text';

interface BlockQuestionInput {
  question: number;
  answerOption: number;
  isCorrect: boolean;
}

type TextOptionProps = {
  answer: any;
  onClick: (result: BlockQuestionInput) => void
}

export const TextOption: FC<TextOptionProps> = ({ answer, onClick }) => {

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsAnswered(false);
  }, [answer])

  const handleAnswer = () => {
    setIsCorrect(answer.isCorrect)
    setIsAnswered(true);
    const inputAnswer: BlockQuestionInput = {
      question: -1,
      answerOption: answer.id,
      isCorrect: answer.isCorrect
    };
    onClick(inputAnswer)
  }

  return (
    <>
      <audio
        src={isAnswered ?
          isCorrect ? audioCheck : audioError
          : ''}
        autoPlay={isAnswered ? true : false}
      />
      <TextOptionStyles
        onClick={() => handleAnswer()}
        isCorrect={isAnswered && answer?.isCorrect}
        isAnswered={isAnswered}
      >
        <TypoGeneralText style={{ margin: 0 }}>{answer?.answerText}</TypoGeneralText>
      </TextOptionStyles>
    </>
  )
}

const TextOptionStyles = styled.div<{
  isCorrect?: boolean;
  isAnswered?: boolean;
}>`
    width: 90%;
    margin: 20px auto;
    font-family: ${Typography.secondary};
    font-weight:300;
    padding:2px;

    background-color: ${props => props.isAnswered ?
    props.isCorrect ? BasicColor.greenSoft :
      BasicColor.red
    :
    BasicColor.white20};
    pointer-events: ${props => props.isAnswered ? 'none' : 'auto'};
    cursor: pointer;
    line-height: 30px;
    border-radius: 5px;
    &:hover{
      box-shadow: 1px 4px 3px 2px ${BasicColor.black};
    }
    @media screen and (min-width: ${ScreenSize.tablet}) {
      height: 100%;
      line-height: 35px;
      padding: 10px;

    }
    @media screen and (min-width: ${ScreenSize.desktop}) {
      height: 100%;
      line-height: 40px;
    }
  `;
