import React,{useState} from 'react';
import "./Choose_Char.css";
import InfoModal from "./Char_Inform";
import Rusiu from "./img/Rusiu.png";
import Tracer from "./img/Tracer.png";
import Hog from "./img/Hog.png";
import Sodier from "./img/Soldier.png";
import Zariya from "./img/Zariya.png";
import Ana from "./img/Ana.png";
import unchosen from "./img/unchosen.png";
import {Link} from "react-router-dom";


const title = {
    marginLeft:"4px",
    float: "left",
    display: "flex",
    fontSize:"24px",
    lineHeight:"28px",
    color:"#0C8247"
}
const subtitle = {
    position: "absolute",
    paddingLeft: "5px",
    color: "#0C8247",
    marginLeft:"0px",
    marginTop: "-40px",
    fontSize: "14px",
    lineHeight: "16px",
    float: "left",
    display: "flex",
    marginBottom: "0px"
}
const CharName = {
    color: "#FCCE39",
    fontSize: "16px",
    float: "left",
    paddingLeft: "10px",
    paddingTop: "5px"
}
const Category = {
    color:"#0C8247",
    fontSize: "14px",
    letterSpacing: "-0.03em"
}

export default function Choose_Char() {
    const Chr = [unchosen, Rusiu, Hog, Sodier, Zariya, Tracer, Ana];
    const Ch_name = ["unchosen", "Rusiu", "Hog", "Sodier", "Zariya", "Tracer", "Ana"];
    const Catego = ["튀김류", "국물류", "복음류"]
    const [count, setCount] = useState(0);
    const [idx, setIdx] = useState(0);
    const [value, setValue] = React.useState("");
    const [ modalOpen, setModalOpen ] = useState(false);
    const previous = ()=>{
        setIdx(idx-1)
    }
    const next = ()=>{
        setIdx(idx+1)
    }
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return(

        <>
            <div className="main">
                <div className="sel_hero">
                    <a style={title}>안주선택</a><br></br>
                    <a style={subtitle}>원하는 안주를 선택해주세요</a><br></br>
                    <div className="sel_header">
                        <button onClick={previous}>이전</button>
                        <a style={Category}> {Catego[idx]}</a>
                        <button onClick={next}>다음</button>
                    </div>
                    <div>
                        {
                            idx===0 && <div className="container_select">
                                <img src={Rusiu}  alt='Rusiu' onClick={()=>{setCount(1)}}/>
                                <img src={Hog} alt='Hog'  onClick={()=>{setCount(2)}} />
                                <img src={Sodier} alt='Soldier' onClick={()=>{setCount(3)}}/>
                                <img src={Zariya} alt='Zariya' onClick={()=>{setCount(4)}} />
                                <img src={Tracer} alt='Tracer' onClick={()=>{setCount(5)}}/>
                                <img src={Ana} alt='Ana' onClick={()=>{setCount(6)}}/>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===1 && <div className="container_select">
                                <img src={Hog}  alt='Rusiu' onClick={()=>{setCount(2)}}/>
                                <img src={Rusiu} alt='Hog'  onClick={()=>{setCount(1)}} />
                                <img src={Sodier} alt='Soldier' onClick={()=>{setCount(3)}}/>
                                <img src={Zariya} alt='Zariya' onClick={()=>{setCount(4)}} />
                                <img src={Tracer} alt='Tracer' onClick={()=>{setCount(5)}}/>
                                <img src={Ana} alt='Ana' onClick={()=>{setCount(6)}}/>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===2 && <div className="container_select">
                                <img src={Sodier}  alt='Rusiu' onClick={()=>{setCount(3)}}/>
                                <img src={Hog} alt='Hog'  onClick={()=>{setCount(2)}} />
                                <img src={Rusiu} alt='Soldier' onClick={()=>{setCount(1)}}/>
                                <img src={Zariya} alt='Zariya' onClick={()=>{setCount(4)}} />
                                <img src={Tracer} alt='Tracer' onClick={()=>{setCount(5)}}/>
                                <img src={Ana} alt='Ana' onClick={()=>{setCount(6)}}/>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===0 && <div className="category_button_box">
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" onClick={()=>{setIdx(2)}}/>

                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===1 && <div className="category_button_box">
                                <button className="category_button" onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" onClick={()=>{setIdx(2)}}/>

                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===2 && <div className="category_button_box">
                                <button className="category_button" onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(2)}}/>

                            </div>
                        }
                    </div>


                </div>
                <div className="chosen_hero">
                    <img className="image_chosen" src={Chr[count]} alt={'unchosen'} />
                    <button type="button" className="image_inform" onClick={openModal}>i</button>
                    <div className="Chr_Name_box" style={CharName}>{Ch_name[count]}</div>
                    <input id="id" type="text"  placeholder="닉네임을 입력하세요" value={value} className="input_box" onChange={e=>setValue(e.target.value)} />
                    <InfoModal open={modalOpen} close={closeModal} header={"Info"}>
                        설명
                    </InfoModal>
                </div>
                <div className="complete_button_wrapper">
                    <Link to ="./find">
                        <div>
                            { value===""
                                ?<button className="complete_button2">캐릭터 생성 완료</button>
                                :<button className="complete_button1">캐릭터 생성 완료</button>

                            }
                        </div>
                    </Link>

                </div>

            </div>

        </>
    );
}
