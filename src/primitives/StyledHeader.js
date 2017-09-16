import glamorous from 'glamorous';

const StyledHeader = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  maxWidth: '800',
  margin: '0 auto',
  background: '#fff',
  position: 'relative',
  zIndex: '9999',
  padding: '.5rem 1rem',
});

export const StyledHeaderRight = glamorous.div({
  align: 'flex-end',
  fontSize: '.9rem',
});

export default StyledHeader;
