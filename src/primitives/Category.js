import glamorous from 'glamorous';

const Category = glamorous.div({
  fontSize: '.6rem',
  background: '#e2e2e2',
  borderRadius: '1rem',
  padding: '.5rem 1rem',
  display: 'inline-block',
}, props => {
  if (props.type === 'github') return { background: '#f3b8f9' };
  if (props.type === 'medium') return { background: '#9cffcc' };
});

export default Category;
