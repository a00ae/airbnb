

interface Props {
  width?: number | string;
  height?: number | string;
}
                            

const Logo = ({ width = 50, height = 60 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path
        d="M 50 62.5 
       C 43.5 54, 43.5 45.5, 50 45.5 
       C 56.5 45.5, 56.5 54, 50 62.5 
       C 40 76.5, 23 79, 17.5 73.5 
       C 11 67, 28 35, 50 14.5 
       C 72 35, 89 67, 82.5 73.5 
       C 77 79, 60 76.5, 50 62.5 Z"
        fill="none"
        stroke="#FF5A5F"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
