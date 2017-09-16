import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

const Navigation = glamorous.nav({
  listStyle: 'none',
  display: 'inline-block',
  paddingLeft: '1rem',
});

export const NavigationLink = glamorous(Link)({
  fontSize: '1.2rem',
  textDecoration: 'none',
  marginRight: '1rem',
  fontWeight: '200',
});

export default Navigation;
