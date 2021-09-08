import ract from 'react'

const msg1 = "이쁘고 맛도 좋은 안주들이 판을 치는 이 험난한 안주 대학교에서 말라비틀어진 내가 살아남을 수 있게"
const msg2 = "너네들이 날 좀 도와줘!";
const submsg = "(제발)";
const StoryEnd = () => {

  return (
    <>
      <div className="endStoryContainer">
        <div className="storyMsgFirst">{msg1}</div>
        <div className="storyMsgSecond">{msg2}</div>
        <div className="storyMsgSub">{submsg}</div>

      </div>
    </>
  )
};


export default StoryEnd;