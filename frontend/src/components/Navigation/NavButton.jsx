import { TERipple } from 'tw-elements-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { navClickableStyle } from '../../library/tailwindMulticlasses';

const NavButton = ({ linkPath, text, handler, color }) => {
  const navigate = useNavigate();

  const navClickHandler = (event) =>
    linkPath ? navigate(linkPath) : handler(event);

  return (
    <TERipple rippleColor='light' rippleUnbound rippleRadius={70}>
      <button onClick={navClickHandler} className={navClickableStyle(color)}>
        {text}
      </button>
    </TERipple>
  );
};

NavButton.propTypes = {
  linkPath: PropTypes.string,
  text: PropTypes.string.isRequired,
  handler: PropTypes.func,
  color: PropTypes.string,
};

NavButton.defaultProps = {
  linkPath: '',
  handler: () => {},
  color: 'primary',
};

export default NavButton;
