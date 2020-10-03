import React from 'react';

import logo from '../../assets/logo.png';
import logoPublica from '../../assets/logo-publica.png'
import './styles.css';

interface PageDefaultProps {
    children?: Object;
    funcState: Function;
}

const PageDefault: React.FC<PageDefaultProps> = (props) => {
    return (
        <div id='main-container'>
            <header>
                <img src={logo} alt="logo" />
                {window.innerWidth > 700 ? (

                    <div className="buttons">
                        <button onClick={() => {
                            props.funcState(true)
                        }}>NOVO JOGO</button>
                        <button >CONSULTA</button>
                    </div>
                ) : null}
            </header>
            <div className="content">
                {props.children}
            </div>
            <footer>
                Projeto desenvolvido para o processo Seletivo da Pública
                <img src={logoPublica} alt="logoPublica" />
            </footer>
            {window.innerWidth < 700 ? (
                <div className="buttons-mobile" >
                    <button onClick={() => {
                        props.funcState(true)
                    }}>NOVO JOGO</button>
                    <button >CONSULTA</button>
                </div>
            ) : null}
        </div>
    );
}

export default PageDefault;