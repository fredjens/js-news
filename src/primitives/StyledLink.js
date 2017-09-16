import glamorous from 'glamorous';
import { Link } from 'react-router-dom';

const StyledLink = glamorous(Link)({
  borderBottom: '1px solid #000',
  padding: '0',
});

export default StyledLink;
