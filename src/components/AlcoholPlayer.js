import React, {useEffect} from "react";
import "./AlcoholPlayer.css"

export default function AlcoholPlayer() {
    const playerList = {0:'지성', 1:'호준', 2:'종휘',3:'정민',4:'성원', 5:'재혁', 6:'나영'};

    const start = () => {
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "mainDiv");
        document.body.appendChild(mainDiv);
        return mainDiv;
    }

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

    const createAlcohol = () => {
        const main = start();
        getPlayerList(main);
    }

    useEffect(() => {
        createAlcohol();
    }, [])

    return (
        <>
            <div>

            </div>
        </>
    )
}