import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

const Message = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;
