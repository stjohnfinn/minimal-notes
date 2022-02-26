import React, { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
// @ts-ignore
import sanitizeHtml from 'sanitize-html';
import '../style/Editor.css';

const COMMAND_HEADER = '&gt;h';
const COMMAND_SUBHEADER = '&gt;s';
const COMMAND_BULLET = '&gt;b';
const COMMAND_NORMAL = '&gt;n';

export default function Editor() {

    const documentContent = [useRef('Enter text here...')];

    const [saved, setSaved] = useState(true);

    const documentSections = useRef([
        <ContentEditable
            html={documentContent[0].current}
            onChange={handleChange}
            className='i0'
            key={0}
        />
    ]);

    function createContentEditable(i: number): any {
        let el;
    
        el = (
            <ContentEditable
                html={documentContent[i].current}
                onChange={handleChange}
                key={i}
                className={'i' + String(i)}
            />
        );
    
        return el;
    }

    function handleChange(e: any) {

        console.log(documentContent, documentSections);

        const { value } = e.target;
        const { className } = e.nativeEvent.target;
        const elementId = Number(className[1]);

        documentContent[elementId].current = value;
    }

    function useCreateContentRef() {
        const contentRef = useRef('-- header --');
        return contentRef;
    }

    function onSave(): void {

    }

    function onExit(): void {

    }

    function insertHeader(): void {
        documentContent.push(useCreateContentRef());
        documentSections.current.push(createContentEditable(documentContent.length - 1));
    }

    function insertSubheader(): void {

    }

    function insertBullet(): void {

    }

    return (
        <div className='editor'>
            <div>
                <div className='metadata'>
                    <h1>Title</h1>
                    <p>{saved ? 'all changes saved' : 'unsaved changes'}</p>
                </div>
                <div className='editorControls'>
                    <button onClick={insertSubheader} >SUBHEADER</button>
                    <button onClick={insertHeader} >HEADER</button>
                    <button onClick={insertBullet} >BULLET</button>
                    <button className='important' onClick={onSave}>SAVE</button>
                    <button className='important' onClick={onExit}>EXIT</button>
                </div>
                {documentSections.current}
            </div>
        </div>
    );
}