import React from 'react';
//import './App.css';

function CustomComponente2(props) {
    return (
        <div aling="center" className="CustomComponente2">
            <header>
                <h1>
                    Pagina {props.nome}
                </h1>
            </header>
            <ol>
                <li>It's a popular library, so I'll be
                    able to fit in with the cool kids!</li>
                <li>I'm more likely to get a job as a developer
                    if I know React</li>
            </ol>
            <footer>
                <small>© 2021 Ziroll development. All rights reserved.</small>
            </footer>
        </div>
    );
}

export default CustomComponente2;