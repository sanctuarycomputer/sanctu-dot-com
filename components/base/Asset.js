import { Image } from 'components/base';
import PropTypes from 'prop-types';

const Asset = (props) => {
  if ((props.asset.contentType || '').startsWith('video/')) {
    return (
      <video
        className={`BlockImage__video block ${props.className}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={props.asset.url}></source>
      </video>
    );
  }

  if ((props.asset.contentType || '').startsWith('image/')) {
    return (
      <Image
        className={`BlockImage__image ${props.className}`}
        src={props.asset.url}
        height={props.asset.height}
        width={props.asset.width}
        alt={props.asset.description}
        sizes={props.sizes || '100vw'}
      />
    );
  }

  return null;
};

Asset.propTypes = {
  className: PropTypes.string,
  asset: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    contentType: PropTypes.string,
  }).isRequired,
  sizes: PropTypes.string,
};

Asset.defaultProps = {
  className: '',
  asset: {
    title: '',
    url: '',
    description: '',
    width: 0,
    height: 0,
    contentType: '',
  },
  sizes: '100vw',
};

export default Asset;
