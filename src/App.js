import './App.css';
import { useState } from 'react';
import Body from './component/body';
import Footer from './component/Footer';
import Header from './component/Header';

function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length;i++){
  let t = props.topics[i];
  lis.push(<li key={t.id} >
    <a id={t.id} href={'./read/'+t.id} onClick ={event=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
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
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}
function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setbody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        setbody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update'></input></p>
    </form>
  </article>
}
function App() {
  //const _mode = useState("Welcome");
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics]  = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'},
  ]);

  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title = "Welcome" body="Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body = null; 
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title = {title} body={body}></Article>
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li><input type='button' value='Delete' onClick={()=>{
        const newTopics = [];
        for(let i=0; i<topics.length;i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
            setMode('WELCOME');
          }
        }
        setTopics(newTopics);
      }}/>
    </>
}else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId,title:_title,body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if(mode === 'UPDATE'){
    let title, body = null; 
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{  
      const newTopics =[...topics]
      const updatedTopics = {id:id, title:title, body:body}
      for(let i=0;i<newTopics.length;i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopics;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <h1>git변경해보기</h1>
      <Header/>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
      <Footer title="하단부">Create</Footer>
    </div>
  );
}

export default App;
