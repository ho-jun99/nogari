import React, {useState} from 'react';
import './find.css'
import LinkModal from "./Link_input";

export default function Find() {
    const title={
        fontSize:"20px",
        fontFamily: "DungGeunMo",
        lineHeight: "20px",
        color: "#0C8247",
        marginTop:"-80px"
    }
    const subtitle={
        fontSize:"13px",
        color:"#0C8247;",
        fontFamily:"DungGeunMo",
        lineHeight:"16px",
        marginTop:"10px"
    }
    const [ modalOpen, setModalOpen ] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    return (
        <>
            <div className="find_main">
                <div style={title}>
                    대기실
                    <div style={subtitle}>
                        <br/>새로운 방을 만들어 친구들을 초대하거나<br/>
                        친구가 보내준 링크를 타고 방으로 입장해보세요.
                    </div>
                    <div className="make_wrapper">
                        <div className="make">
                            <div style={{fontSize:"45px",paddingTop:"30.59px",lineHeight:"45px",letterSpacing: "0.065em",fontFamily: "DungGeunMo" }}>방 만들기</div>
                            <div style={{fontSize:"11px",paddingTop:"13.89px"}}>방장이 되어 다른친구들을 초대해보세요!</div>
                        </div>
                        <div className="make" onClick={openModal}>
                            <div style={{fontSize:"45px",paddingTop:"30.59px",lineHeight:"45px",letterSpacing: "0.065em",fontFamily: "DungGeunMo" }}>링크 입력</div>
                            <div style={{fontSize:"11px",paddingTop:"13.89px"}}>친구가 보내준 링크를 입력하여 게임에 참여하세요!</div>
                        </div>
                    </div>



                </div>

                <div className="RightBox">
                    <div className="NameBox">
                        <a style={{
                            position:"absolute",
                            paddingTop:"10px",
                            paddingLeft:"18px",
                            fontFamily: "DungGeunMo",
                            fontSize: "12px",
                            lineHeight: "19px",
                            color: " #FCCE39"}}>맥반석 오징어</a>
                        <a style={{
                            position:"absolute",
                            paddingTop:"20px",
                            paddingLeft:"15px",
                            fontFamily: "DungGeunMo",
                            fontSize: "33px",
                            lineHeight: "53px",
                            letterSpacing: "0.01em",
                            color: "#FCCE39"}}>청춘 김민석</a>
                    </div>

                </div>
                <LinkModal open={modalOpen} close={closeModal}/>
            </div>
        </>
    );
}