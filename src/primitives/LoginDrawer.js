import glamorous from 'glamorous';
import { css } from 'glamor';

const bounce = css.keyframes({
  '0%': { transform: 'translateY(-10%)', opacity: '0' },
  '100%': { transform: 'translateY(0)', opacity: '1' },
});

const Container = glamorous.div({
  padding: '3rem 1rem',
  maxWidth: '300px',
  margin: '0 auto',
  animation: `${bounce} 200ms ease-out`,
});

export default Container;
