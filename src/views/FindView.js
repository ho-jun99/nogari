import React from 'react';
import './find.css'
export default function FindView() {
    const title={
        fontSize:"24px",
        fontFamily: "DungGeunMo",
        lineHeight: "28px",
        alignItems: "center",
        color: "#0C8247"
    }
    const subtitle={
        fontSize:"14px",
        color:"#0C8247;",
        fontFamily:"DungGeunMo",
        lineHeight:"16px"
    }
    return (
        <>
            <div className="main">
                <div style={title}>
                    대기실
                    <div style={subtitle}>
                        <br/><br/>새로운 방을 만들어 친구들을 초대하거나<br/>
                        친구가 보내준 링크를 타고 방으로 입장해보세요.
                    </div>
                    <div className="make_wrapper">
                        <div className="make">
                            <div style={{fontSize:"68px",paddingTop:"38.59px",lineHeight:"80px",letterSpacing: "0.065em",fontFamily: "DungGeunMo" }}>방 만들기</div>
                            <div style={{fontSize:"18px",paddingTop:"15.89px",color:"white" }}>방장이 되어 다른친구들을 초대해보세요!</div>
                        </div>
                        <div className="make">
                            <div style={{fontSize:"68px",paddingTop:"38.59px",lineHeight:"80px",letterSpacing: "0.065em",fontFamily: "DungGeunMo"  }}>링크 입력</div>
                            <div style={{fontSize:"18px",paddingTop:"15.89px",color:"white" }}>친구가 보내준 링크를 입력하여 게임에 참여하세요!</div>
                        </div>
                    </div>


                </div>
                <div className="RightBox">
                    <div className="NameBox">
                        <a style={{
                            position:"absolute",
                            paddingTop:"20px",
                            paddingLeft:"24px",
                            fontFamily: "DungGeunMo",
                            fontSize: "16px",
                            lineHeight: "19px",
                            color: " #FCCE39"}}>맥반석 오징어</a>
                        <a style={{
                            position:"absolute",
                            paddingTop:"40px",
                            paddingLeft:"21px",
                            fontFamily: "DungGeunMo",
                            fontSize: "45px",
                            lineHeight: "53px",
                            letterSpacing: "0.01em",
                            color: "#FCCE39"}}>청춘 김민석</a>
                    </div>

                </div>
            </div>
        </>
    );
}
