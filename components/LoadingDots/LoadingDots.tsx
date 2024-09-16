import s from './LoadingDots.module.css';

type Props ={
  className?: string
}
const LoadingDots = ({ className}: Props) => {
  return (
    <span className={`${s.root} ml-3`}>
      <span className={`${className} bg-zinc-700`}/>
      <span className={`${className} bg-zinc-700`}/>
      <span className={`${className} bg-zinc-700`}/>
    </span>
  );
};

export default LoadingDots;
