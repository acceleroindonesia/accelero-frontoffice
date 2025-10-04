'use client';

import Link from 'next/link';

// interfaces
interface IProps {
  url: string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const DropdownItem: React.FC<IProps> = ({ url, text, active = false, onClick }) => {
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;

  return (
    <Link
      href={normalizedUrl}
      onClick={onClick}
      className={`button ${active ? 'active' : 'passive'}`}
    >
      {text}
    </Link>
  );
};

export default DropdownItem;