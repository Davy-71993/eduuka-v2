import s from './LoadingDots.module.css';

const LoadingDots = () => {
  return (
    <span className={`${s.root} ml-3`}>
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
