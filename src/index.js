import React from 'react';
import { render } from 'react-dom';

//CSS 

import './style/css/bootstrap.min.css';
import './index.css';

//Monjs
import { sampleText } from './sampleText';

//marked.js 
import marked from 'marked';


class App extends React.Component{
    
    //state est un objet 
    state = {
        text: sampleText
    };

    //*******************Lifecycle*****************///
    
    //juste avant que le rendu soit lancé 
    componentWillMount(){
        const text = localStorage.getItem('text');
        if(text){
            this.setState({ text })
        }
    }   
    //une fonction de react qui va se charger juste avt le rendu 
    //nextprops, nextstate quest ce quon va faire avec l etat qui va arriver
    componentWillUpdate(nextProps, nextState){
        //2eme propiete la valeur quon va lui donné nextstate le state qui va arriver juste apres la modif   
        localStorage.setItem('text', nextState.text);
    }


    /*********************************************** */
    editText = (event) => {
        const text = event.target.value;
        this.setState({ text })
    };
    renderText = (text) =>{
        //sanitize tien en compte des balises html donc on nettoie
        const renderText = marked(text, {sanitize:true});
        //__html donnée entré par l'utilisateur c'est pas comme un innerhtml **dangerouslySetInnerHTML
        return { __html: renderText};
    };
    render(){
        return( 
            
            <div className="container">
                <div className="row">
                    
                    <div className="col-sm-6">
                        <textarea 
                            rows="45"  
                            value={this.state.text} 
                            className="form-control"
                            onChange={(e) => this.editText(e)}
                        >   
                        </textarea>
                    </div>
                    <div className="col-sm-6">
                        <div 
                            dangerouslySetInnerHTML={this.renderText(this.state.text)} 
                        />    
                    </div>
                </div>
            </div>

        )
    }
}

render(
    <App />, document.getElementById('root')
);