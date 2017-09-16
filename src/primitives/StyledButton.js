import glamorous from 'glamorous';

const Button = glamorous.button({
  fontFamily: '"Roboto Mono", monospace',
  background: '#000',
  color: '#fff',
  border: '0',
  padding: '.5rem 1rem',
  fontSize: '.9rem',
  marginRight: '1rem',
  cursor: 'pointer',
}, props => props.white && ({
    background: '#fff',
    color: '#00',
  }),
);

export default Button;
