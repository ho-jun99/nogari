import React,{useState} from 'react';
import "./Choose_Char.css";
import Rusiu from "./img/Rusiu.png";
import Tracer from "./img/Tracer.png";
import Hog from "./img/Hog.png";
import Sodier from "./img/Soldier.png";
import Zariya from "./img/Zariya.png";
import Ana from "./img/Ana.png";
import unchosen from "./img/unchosen.png"

function Choose_Char(){
    let Chr=[unchosen,Rusiu,Hog,Sodier,Zariya,Tracer,Ana];
    const[count,setCount] =useState(0);

    return(

        <>
            <div className="main">
                <div className="sel_hero">
                    SELECT A HERO
                    <div className="container_select1">
                        <img className="box_hero" src={Rusiu}  alt='Rusiu' onClick={()=>{setCount(1)}}/>
                        <img className="box_hero" src={Hog} alt='Hog'  onClick={()=>{setCount(2)}} />
                        <img className="box_hero" src={Sodier} alt='Soldier' onClick={()=>{setCount(3)}}/>
                    </div>
                    <div className="container_select2">
                        <img className="box_hero" src={Zariya} alt='Zariya' onClick={()=>{setCount(4)}} />
                        <img className="box_hero" src={Tracer} alt='Tracer' onClick={()=>{setCount(5)}}/>
                        <img className="box_hero" src={Ana} alt='Ana' onClick={()=>{setCount(6)}}/>

                    </div>
                </div>
                <div className="chosen_hero">
                    Your Hero
                    <img className="image_chosen" src={Chr[count]} alt={'unchosen'} />
                </div>
            </div>

        </>
    );
}
export default Choose_Char;
