import React, { Component } from 'react';
import css from 'components/LoadMore/LoadMore.module.css';
import PropTypes from 'prop-types';
class LoadMore extends Component {
  render() {
    return (
      <div className={css.container_Button}>
        <button
          type="button"
          className={css.Button}
          onClick={this.props.onClick}
        >
          Load more
        </button>
      </div>
    );
  }
}
LoadMore.propTypes = {
  onClick: PropTypes.func,
};
export default LoadMore;
