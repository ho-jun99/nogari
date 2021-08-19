import React, {useEffect} from 'react';
import "./AlcoholField.css"

export default function AlcoholField() {
    // const [width, setWidth] = useState(0)
    // const [height, setHeight] = useState(0)
    // const getWidth = (e) => {
    //     setWidth(e.target.value)
    // }
    // const getHeight = (e) => {
    //     setHeight(e.target.value)
    // }
    const width = 6;
    const height = 6;

    const start = (locations) => {
        // const mainField = document.createElement("div");
        // mainField.setAttribute("class", "mainField");
        // document.body.appendChild(mainField)
        //
        // return mainField;
        return <div className="mainField">
            {locations.map()}<div></div>
        </div>;
    }

    const createField = (number, location, mainField) => {
        const createDiv = document.createElement("div")
        createDiv.setAttribute("class", location)
        const createDivText = document.createTextNode( `${number}`);
        createDiv.appendChild( createDivText );
        mainField.append(createDiv);
    }

    const createBr = (mainField) => {
        const createBR = document.createElement("br");
        mainField.append(createBR);
    }

    const create = (main) => {
        for (let i = 1 ; i < width*height +1; i++) {
            if (i === 1 || i === (height-1)*width+1) {
                createField(i, 'edge', main);
            } else if (i == width || i == width*height) { //TODO : 대체 왜 i === width는 적용이 안되고 i == width는 적용이 될까요?
                createField(i, 'edge', main);
                createBr(main);
            } else if (i % width === 1) {
                createField(i, 'left', main);
            } else if (i % width === 0) {
                createField(i,'right', main);
                createBr(main);
            } else if ((i > 1 && i < width)||(i > width*(height-1)+1 && i < width*height)) {
                createField(i,'center', main);
            } else {
                createField(i,'null', main);
            }
        }
    }

    const playerList = {0:'지성', 1:'호준', 2:'종휘',3:'정민',4:'성원', 5:'재혁', 6:'나영'};

    const createPlayers = (num, main) => {
        const createProfile = document.createElement("div");
        const createProfileText = document.createTextNode(playerList[`${num}`]);
        createProfile.appendChild(createProfileText);
        createProfile.setAttribute("class", "player-marble")
        main.append(createProfile);
    }

    const getPlayerList = (main) => {
        const length = Object.keys(playerList).length;
        for (let i =0; i < length; i++) {
            createPlayers(i, main);
        }
    }

    const main = start();

    const createAlcoholMarble = () => {
        create(main);
    }

    const createAlcohol = () => {
        getPlayerList(main);
    }
    useEffect(() => {
        createAlcoholMarble();
        createAlcohol();
    }, [])

    return (
        <>
            <div className={"align"}>
            </div>
        </>
    )
}
