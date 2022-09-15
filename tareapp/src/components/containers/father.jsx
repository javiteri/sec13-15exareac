import React , {useState} from 'react';
import Child from '../pure/child';

export const Father = () => {

    const [name, setName] = useState("Javier");

    function showMessage(text) {
        alert(`Message: ${text}`);
    }

    function updateName(NewName){
        setName(NewName);
    }

    return (
        <div style={{ background: 'tomato', padding: '10px' }}>
            <Child name={name} send={showMessage} update={updateName}></Child>
        </div>
    );
}


