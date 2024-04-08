import { useReducer } from 'react';

import { handleAnswerCheck } from '@/stores/game/quizStore.jsx';

const inputChoiceState = {
  selectedChoiceIndex: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHOICE':
      return { ...state, selectedChoiceIndex: action.payload };
    case 'RESET_INPUT':
      return { ...inputChoiceState };
    default:
      return state;
  }
};

const ChoiceQuiz = ({ answer, choices, mainCategory, id }) => {
  const [state, dispatch] = useReducer(reducer, inputChoiceState);

  const handleChoiceSelect = (choiceIndex) => {
    dispatch({ type: 'SELECT_CHOICE', payload: choiceIndex });
    handleAnswerCheck(choiceIndex.toString(), answer, mainCategory, () => dispatch({ type: 'RESET_INPUT' }), id);
  };

  return (
    <div className="flex items-center w-full h-full justify-evenly">
      {choices.map((choice, index) => (
        <div key={index} className="flex flex-col items-center justify-center mr-5">
          <button
            type="button"
            onClick={(event) => handleChoiceSelect(index.toString(), event.target.value)}
            value={index}
            className={state.selectedChoiceIndex === index ? 'selected' : ''}
          >
            <p className="text-lg">
              {index + 1}&ensp;{choice}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChoiceQuiz;
