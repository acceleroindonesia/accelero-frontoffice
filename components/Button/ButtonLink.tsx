import Link from 'next/link';

interface IProps {
  url: string;
  text: string;
  color: string;
  leftIcon?: string;
  rightIcon?: string;
  target?: string;
  rel?: string;
}

const ButtonLink: React.FC<IProps> = ({
  url,
  text,
  color,
  leftIcon,
  rightIcon,
  target = '_blank',
  rel = 'noopener noreferrer',
}) => {
  const isExternal =
    url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('https://wa.me');

  const content = (
    <>
      {leftIcon && <span className='material-symbols-outlined left-icon'>{leftIcon}</span>}
      {text}
      {rightIcon && <span className='material-symbols-outlined right-icon'>{rightIcon}</span>}
    </>
  );

  return isExternal ? (
    <a href={url} className={`button ${color}`} target={target} rel={rel}>
      {content}
    </a>
  ) : (
    <Link className={`button ${color}`} href={`/${url}`}>
      {content}
    </Link>
  );
};

export default ButtonLink;
