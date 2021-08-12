import React from 'react';
import './css/AlcoholMarblePlayer.css'

export default function AlcoholMarblePlayer(props){
    const username = props.name;
    return (
        <>
            <div className="user">{username}</div>
        </>
    )
}