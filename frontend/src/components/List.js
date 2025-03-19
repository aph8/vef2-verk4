import Link from 'next/link';

const List = ({ items, basePath = '' }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`${basePath}/${item.slug}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default List;
