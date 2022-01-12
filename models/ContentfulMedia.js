import PropTypes from 'prop-types';

export default PropTypes.shape({
  fields: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string
    })
  })
});