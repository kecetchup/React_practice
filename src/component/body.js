import {useRef,useState} from "react"

function Body(props){
    const textRef = useRef();
    const[state, setState] = useState({
        name: "",
        gender: "",
        birth: "",
        bio: "",
    });
    const handleOnChange = (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value,
        });
    };
    function handleOnclick(id){
        
    }
    return(
        <div>
            <div>
                <h1></h1>
            <input
                name="name"
                value={state.name}
                onChange={handleOnChange}
                placeholder="이름"
                />
            </div>
            <div>
                <select name="gender" value={state.gender} onChange={handleOnChange}>
                    <option key={""}></option>
                    <option key={"남성"}>남성</option>
                    <option key={"여성"}>여성</option>
                </select>
            </div>
            <div>
                <input
                name="birth"
                type="date"
                value={state.birth}
                onChange={handleOnChange}
                />
            </div>
            <div>
                <textarea name="bio" value={state.bio} onChange={handleOnChange}/>
            </div>
            <div className="body">
            <button onClick={() => handleOnclick(props.id)}> {props.id} 버튼</button>
            </div>  
        </div>
    );
}

export default Body;