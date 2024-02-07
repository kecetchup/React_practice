import './App.css';
import { useState } from 'react';
import Body from './component/body';
import Footer from './component/footer';

function Header(props){
  return <header>
    <h1><a href="/" onClick={function(event){
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length;i++){
  let t = props.topics[i];
  lis.push(<li key={t.id} >
    <a id={t.id} href={'./read/'+t.id} onClick ={event=>{
      event.preventDefault();
      props.onChangeMode(event.target.id);
    }}>{t.title}</a>
  </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  //const _mode = useState("Welcome");
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode,setMode] = useState('WELCOME');

  const topics  = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'},
  ]

  let content = null;
  
  if(mode === 'WElCOME'){
    content = <Article title = "Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    content = <Article title = "Read" body="Hello, Read"></Article>
  }

  return (
    <div>
      <h1>git변경해보기</h1>
      <Header title="WEB" onChangeMode={()=>{
        setMode = ('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        setMode = ('READ');
      }}></Nav>
      {content}
      <Body/>
      <div>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
