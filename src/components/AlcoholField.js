import React, {useState} from 'react';
import "./AlcoholField.css"
export default function AlcoholField() {
    const [num, setNum] = useState(0)
    const getNum = (e) => {
        setNum(e.target.value)
    }

    const createField = (number, location) => {
        const createDiv = document.createElement("div")
        createDiv.setAttribute("class", location)
        const createDivText = document.createTextNode( `${number}`);
        createDiv.appendChild( createDivText );
        document.body.appendChild( createDiv );
    }

    const createBr = () => {

        const createBR = document.createElement("br")
        document.body.appendChild(createBR)
    }

    const test = () => {
        for (let i = 1 ; i < num*num +1; i++) {
            if (i % num === 1) {
                createField(i, 'left');
            } else if (i % num === 0) {
                createField(i,'right');
                createBr();
            } else if ((i > 1 && i < num)||(i > num*(num-1)+1 && i < num*num)) {
                createField(i,'center');
            } else {
                createField(i,'null');
            }
        }
    }

    return (
        <>
            <input placeholder={'몇 곱하기 몇?'} onChange={getNum}/>
            <button onClick={test}> start</button>
        </>
    )
}
