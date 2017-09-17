import glamorous from 'glamorous';

const UserInfo = glamorous.span({
  marginRight: '1rem',

  '@media (max-width: 500px)': {
    display: 'none',
  },
});

export default UserInfo;
