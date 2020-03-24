import React = require("react");
import {CSSProperties} from 'react';
import {Paragraph} from '../Paragraph';
import {Paragraph as IParagraph} from '../../interfaces'

const container: CSSProperties = {
  padding: '20px'
};
export const StoryPage = ({paragraphs} : { paragraphs: IParagraph[]}) => {
    const fullText = paragraphs.map(({id, ...other}, index) => <Paragraph key={`${id}-${index}`} id={id} {...other}/>);
    return (
        <div style={container}>
            {fullText}
        </div>
    );
};
