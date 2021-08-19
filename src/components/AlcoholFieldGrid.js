import React from "react";

const getMapLocation = (location) => {
    if (location <= 5) {
        return 35 - location;
    } else if (location >= 10 && location <= 17) {
        return location - 10;
    } else if (location >= 6 && location <= 9) {
        return (10 - location) * 6;
    } else {
        return (location - 14) * 6 - 1;
    }
};

console.log(getMapLocation(18));

// const mapLocation = {
//     0: 35,
//     1: 34,
//     2: 33,
//     3: 32,
//     4: 31,
//     5: 30,
//     6: 24,
//     7: 18,
//     8: 12,
//     9: 6,
//     10: 0,
//     11: 1,
//     12: 2,
//     13: 3,
//     14: 4,
//     15: 5,
//     16: 11,
//     17: 17,
//     18: 23,
//     19: 29,
// };

function Field(props){
    return <div style={{
        ...styles.field,
        ...(props.hidden ? {visibility: 'hidden'} : {})
    }}>
        {props.users && props.users.length && props.users.map((user) => user.nickname)}
        {props.content}
    </div>;
}

function isFieldHidden(fieldIndex) {
    const row = fieldIndex / 6;
    const standard = [
        !(((row - 1) * 6) % 6 === 0), // 왼쪽 찾기
        !(fieldIndex % 6 === 5), // 오른쪽 찾기
        !(fieldIndex < 6), // 윗줄 찾기
        !(30 < fieldIndex || fieldIndex > 35), // 아래줄 찾기
    ];
    return standard.filter((s) => s).length === 4;
}

export function AlcoholFieldGrid() {
    const row = 6;
    const column = 6;
    // 0~35까지 만들기
    const fields = Array.from(Array(row * column).keys()).map((v) => v);

    return <div style={styles.fields}>
        {fields.map((field) => {
            return <Field content={field} hidden={isFieldHidden(field)} users={[{nickname: 'test'}]} />;
        })}
    </div>;
}

const styles = {
    fields: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridColumnGap: '10px',
        gridRowGap: '10px',

    },
    field: {
        width:'100%',
        height: '100px',
        backgroundColor:'red',
    },
};