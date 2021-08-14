import React, {useState} from 'react';
import "./AlcoholField.css"

export default function AlcoholField() {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const getWidth = (e) => {
        setWidth(e.target.value)
    }
    const getHeight = (e) => {
        setHeight(e.target.value)
    }

    const createField = (number, location) => {
        const createDiv = document.createElement("div")
        createDiv.setAttribute("class", location)
        createDiv.setAttribute("id", "my")
        const createDivText = document.createTextNode( `${number}`);
        createDiv.appendChild( createDivText );
        document.body.appendChild( createDiv );
    }

    const createBr = () => {
        const createBR = document.createElement("br")
        document.body.appendChild(createBR)
    }

    const createAlcoholMarble = () => {
        for (let i = 1 ; i < width*height +1; i++) {
            if (i === 1 || i === (height-1)*width+1 || i === width*height) {
                createField(i, 'edge');
            } else if (i == width) { //TODO : 대체 왜 i === width는 적용이 안되고 i == width는 적용이 될까요?
                createField(i, 'edge');
                createBr();
            } else if (i % width === 1) {
                createField(i, 'left');
            } else if (i % width === 0) {
                createField(i,'right');
                createBr();
            } else if ((i > 1 && i < width)||(i > width*(height-1)+1 && i < width*height)) {
                createField(i,'center');
            } else {
                createField(i,'null');
            }
        }
    }

    return (
        <>
            <div className={"align"}>
                <input placeholder={'가로'} onChange={getWidth}/>
                <input placeholder={'세로'} onChange={getHeight}/>
                <button onClick={createAlcoholMarble} className={"my"}> start</button>
            </div>
        </>
    )
}
