const Detail = ({ item }) => {
    return (
      <div>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        {item.answers && item.answers.length > 0 && (
          <ul>
            {item.answers.map((answer) => (
              <li key={answer.id}>{answer.text}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Detail;
  