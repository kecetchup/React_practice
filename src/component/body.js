function Body(props){
    function handleOnclick(id){
        alert(`${id} 버튼 클릭`);
    }
    return(
        <div className="body">
            <button onClick={() => handleOnclick(props.id)}> {props.id} 버튼</button>
        </div>  
    );
}

export default Body;