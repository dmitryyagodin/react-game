function Boxes() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    return numbers.map(item => 
       <div key={item} className="grid-item">
         {item}
       </div>
       );
  
  }
  function Game() {
    
    return (
      <div className="grid-container">
        <Boxes />
      </div>
    );
  }
  
  
  
  ReactDOM.render(<Game />, document.getElementById('root'));