import React from 'react';
import './loader.scss'

const Loader = () => {

    console.log('work')
    return (
        <div style={{position: 'relative'}}>
            <div style={{position: 'fixed', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </div>


    );
};

export default Loader;