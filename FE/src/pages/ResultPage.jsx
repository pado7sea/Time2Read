import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getYearSummary } from '../apis/resultApi.jsx';
import ResultButton from '../components/commons/buttons/ResultButton.jsx';
import TranslucentContainer from '../components/commons/containers/TranslucentContainer.jsx';
import WhiteContainer from '../components/commons/containers/WhiteContainer.jsx';
import ResultContent from '../components/commons/ResultContent.jsx';
import ResultTitle from '../components/commons/ResultTitle.jsx';
import Articles from '../components/result/Articles.jsx';
import Keyword from '../components/result/Keyword.jsx';
import { useGameResultStore } from '../stores/game/gameStore.jsx';

const ResultPage = () => {
  const navigate = useNavigate();

  const { gameResult } = useGameResultStore(); // 게임 결과 : 정답 수, 오답 수, 타임 어택 시간
  const [keywordData, setKeywordData] = useState([]);

  useEffect(() => {
    getYearSummary(2024)
      .then((data) => {
        setKeywordData(data.keywords);
        console.log('Year Summary Data:', data.keywords);
      })
      .catch((error) => {
        console.error('Error requesting year summary:', error);
      });
  }, []);

  // 홈 페이지로 이동하는 함수
  const navigateToLandingPage = () => {
    navigate('/');
  };

  // 사용자 정보 페이지로 이동하는 함수
  const navigateToMyPage = () => {
    navigate('/user');
  };
  return (
    <>
      <div className="bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="w-full max-w-[60%] mx-auto ">
          <h1>결과페이지</h1>
          <div className="relative flex flex-col items-center w-full gap-4 border-4 border-red-500 ">
            {/* topbox */}
            <TranslucentContainer>
              <div className="flex flex-row items-center w-full gap-6 border-4 border-blue-500">
                {/* leftbox */}
                <div className="flex flex-col justify-center w-2/6 gap-6 ">
                  {/* 맞은 개수 통계 */}
                  <WhiteContainer>
                    <ResultTitle title={'맞은 개수 통계'} />
                    <ResultContent>
                      <div className="flex items-center w-full justify-evenly">
                        총 문제 수 {gameResult.correct + gameResult.incorrect} 개
                      </div>
                      <div>맞은 개수 {gameResult.correct} 개</div>
                      <div>틀린 개수 {gameResult.incorrect} 개</div>
                    </ResultContent>
                  </WhiteContainer>
                  {/* 타임 어택 시간 */}
                  <WhiteContainer>
                    <ResultTitle title={'타임 어택 시간'} />
                    <ResultContent>
                      {gameResult.timeAttackTime ? <div>{gameResult.timeAttackTime}</div> : <div> 00:00:00 </div>}
                    </ResultContent>
                  </WhiteContainer>
                </div>
                {/* rightbox */}
                <div className="w-4/6 h-full">
                  <WhiteContainer>
                    <ResultTitle title={'키워드'} />
                    <Keyword data={keywordData} width={300} height={200} />
                  </WhiteContainer>
                </div>
              </div>
            </TranslucentContainer>
            {/* buttonbox */}
            <div className="flex items-center w-full justify-evenly">
              <button onClick={navigateToLandingPage}>
                <ResultButton>
                  <ResultTitle title={'다시 시계토끼 쫓아가기'} />
                </ResultButton>
              </button>
              <button onClick={navigateToMyPage}>
                <ResultButton>
                  <ResultTitle title={'내 정보 더 자세하게 보기'} />
                </ResultButton>
              </button>
            </div>
            {/* relatednewsbox */}
            <TranslucentContainer>
              <ResultTitle title={'과거와 연결된 기사'} />
              <Articles />
            </TranslucentContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
