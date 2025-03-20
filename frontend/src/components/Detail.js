/**
 * Detail component displays detailed information about an item.
 * @param {Object} props
 * @param {Object} props.item - Item to display.
 * @param {string} props.item.title - Title of the item.
 * @param {string} props.item.body - Content/body of the item.
 * @param {Array<{id: string|number, text: string}>} [props.item.answers] - Optional list of answer objects.
 * @returns {JSX.Element} The rendered detail view.
 */
const Detail = ({ item }) => (
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
export default Detail;