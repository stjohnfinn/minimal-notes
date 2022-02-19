import React, { useEffect, useState } from 'react';
import '../style/Editor.css';

export default function Editor() {
    const [documentLines, setDocumentLines] = useState<any[]>([]);
    const [documentContent, setDocumentContent] = useState<string[]>([]);

    useEffect(() => {
        setDocumentContent(prev => {
            let temp = prev;
            temp.push('Enter text here...');
            return temp;
        });
        setDocumentLines([
            (
                <input type='text' className='body' onChange={handleChange} name='i0' key={0} onKeyDown={handleKeyDown} value={documentContent[0]}/>
            )
        ]);
        console.log('use effect');
    }, []);

    function handleChange(e: any) {
        const {  value, name } = e.target;
        const lines = documentContent.length;
        const isEmpty = value == '';
        const index = name[1];
        console.log(value);
        console.log(index);
        setDocumentContent(prev => {
            let temp = prev;
            temp[index] = value;
            console.log(temp);
            return temp;
        });
    }

    function handleKeyDown(e: any) {
        const { key } = e;
        // console.log(key);
    }

    return (
        <div className='editor'>
            <div>
                <div className='fileHeader'>
                    <h1>Principal Component Analysis</h1>
                    <a><img src='/images/exit.svg' /></a>
                </div>
                <div className='editorInput'>
                    {documentLines}
                </div>
            </div>
        </div>
    );
}