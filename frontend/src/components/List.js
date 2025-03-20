import Link from 'next/link';

/**
 * List component renders a list of linked items.
 * @param {Object} props
 * @param {Array<{id: string|number, slug: string, name: string}>} props.items - Items to list.
 * @param {string} [props.basePath] - Base path for item links.
 * @returns {JSX.Element} The list of items.
 */
const List = ({ items, basePath = '' }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <Link href={`${basePath}/${item.slug}`}>{item.name}</Link>
      </li>
    ))}
  </ul>
);
export default List;