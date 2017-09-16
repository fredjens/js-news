import glamorous from 'glamorous';

const StyledHeader = glamorous.div({
  padding: '0 1rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  maxWidth: '800',
  margin: '0 auto',
  background: '#fff',
  position: 'relative',
  zIndex: '9999',
});

export const StyledHeaderRight = glamorous.div({
  align: 'flex-end',
  padding: '1.5rem',
  fontSize: '.9rem',
});

export default StyledHeader;
