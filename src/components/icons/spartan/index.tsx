type LogoProps = {
  width?: number;
  height?: number;
  margin?: number;
};
export const SpartanLogo = ({
  width = 32,
  height = 32,
  margin = 0,
}: LogoProps) => {
  return (
    <div style={{ marginBottom: margin }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="rgb(255%,255%,255%)"
        viewBox="0 0 32 32"
      >
        <path d="M9.703 7.945c.938-.82 1.969-1.512 3.066-2.051L11.063 1.77a18.51 18.51 0 0 0-4.512 3.023zM14.5 5.176c1.16-.391 2.375-.629 3.621-.711V0a18.54 18.54 0 0 0-5.328 1.051zm0 0" />
        <path d="M19.996 0v4.465c1.246.082 2.461.32 3.621.711l1.707-4.125C23.629.449 21.836.09 19.996 0zM4.898 19.563H.434c.09 1.832.441 3.617 1.055 5.328l4.121-1.707a14.07 14.07 0 0 1-.711-3.621zm0 0" />
        <path d="M6.324 24.918l-4.125 1.707.105.234c.691 1.516 1.301 2.859.961 5.02.574-.082 1.297-.223 2.027-.477 1.824-.637 2.953-1.68 3.363-3.113-.949-1.02-1.73-2.152-2.332-3.371zm2.758-6.309a9.99 9.99 0 0 1 9.977-9.961c2.383 0 4.613.852 6.359 2.293l1.668-1.668a12.24 12.24 0 0 0-8.027-2.965 12.24 12.24 0 0 0-8.715 3.605 12.23 12.23 0 0 0-3.602 8.715 12.25 12.25 0 0 0 2.09 6.883zm0 0" />
        <path d="M25.348 5.895c1.098.539 2.129 1.23 3.066 2.051l3.156-3.152a18.6 18.6 0 0 0-4.516-3.023zM6.324 12.34c.543-1.102 1.23-2.129 2.055-3.066L5.227 6.117A18.67 18.67 0 0 0 2.2 10.629zm-1.426 5.351c.078-1.246.32-2.461.711-3.621l-4.125-1.711c-.605 1.7-.961 3.493-1.054 5.332zm17.059 2.207l.836-1.676c.027.012 2.352 1.152 4.961 1.457l-.867-3.152a8.11 8.11 0 0 0-7.828-6.004c-4.469 0-8.102 3.637-8.102 8.105l-.004.031-.293 8.211 5.809-1.074 7.004 6.184 7.66.02-2.852-10.395c-3.242-.191-6.191-1.641-6.324-1.707zm0 0" />
      </svg>
    </div>
  );
};
