import glamorous from 'glamorous';

const Button = glamorous.button({
  fontFamily: '"Rubik", sans-serif',
  background: '#000',
  color: '#fff',
  border: '0',
  padding: '.5rem 1rem',
  fontSize: '.9rem',
  cursor: 'pointer',
}, props => props.white && ({
    background: '#fff',
    color: '#00',
  }),
);

export default Button;
