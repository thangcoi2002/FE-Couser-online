import PropTypes from "prop-types";

import Header from "~/layouts/components/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="mb-10">{children}</div>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
