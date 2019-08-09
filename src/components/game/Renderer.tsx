import React from 'react';
import Canvas from './Canvas';

export const Renderer = (props: any) => {
    return (
        <React.Fragment>
            <Canvas canvas={props} screen={props}/>
        </React.Fragment>
    );
}
