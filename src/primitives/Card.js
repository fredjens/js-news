import glamorous from 'glamorous';

const Card = glamorous.div({
  background: 'rgba(255, 255, 255, .95)',
  padding: '4rem',
  margin: '1px 0',
  transition: 'background 200ms',
  position: 'relative',

  ':hover': {
    background: 'rgba(255, 255, 255, 1)',
  },
}, props => props.dark && ({
    background: '#000',
    color: '#fff',

    ':hover': {
      background: '#000',
    },
  }),
);

export const CardTitle = glamorous.a({
  margin: '0 0 .5rem',
  fontSize: '3.5rem',
  lineHeight: '1',
  fontWeight: '700',
  fontFamily: '"Rubik", sans-serif',
  boxShadow: 'inset 0 -0.14em white, inset 0 -.2em #000',
  transition: 'all 100ms',
  cursor: 'pointer',

  ':hover': {
    boxShadow: 'inset 0 -0.14em white, inset 0 -.4em #53c3e7',
  },
});

export default Card;
