import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

export default function Home() {
    return (
        <div className='Home'>
            <div className='HomeContent'>
                <h1>a <strong>simpler</strong> way to take <strong>more effective</strong> notes.</h1>
                <div className='description' >
                    <div>
                        <p>minimemo works like <strong>markdown language.</strong></p>
                        <p>
                            with just a few <strong>simple shortcuts, instantly format</strong> your
                            notes.
                        </p>
                    </div>
                    <table className='nonSelect'>
                        <thead>
                            <tr>
                                <th>Command</th>
                                <th>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>&gt;h</td>
                                <td>Heading</td>
                            </tr>
                            <tr>
                                <td>&gt;s</td>
                                <td>Sub-heading</td>
                            </tr>
                            <tr>
                                <td>&gt;b</td>
                                <td>Bullet Point</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Link to='/signin' className='homeSignIn' >Launch</Link>
            <div className='footer'>
                <p>all rights reserved MiniMemo 2022.</p>
            </div>
        </div>
    );
}
