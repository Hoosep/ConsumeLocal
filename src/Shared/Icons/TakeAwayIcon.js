import React from "react";
import Icon from '@ant-design/icons';

const TakeAwaySVG = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 64 64"
    >
      <path
        fill="#545c66"
        d="M46 10.5a1 1 0 01-1-1c0-3.859-3.141-7-7-7s-7 3.141-7 7a1 1 0 11-2 0c0-4.963 4.037-9 9-9s9 4.037 9 9a1 1 0 01-1 1z"
      ></path>
      <path
        fill="#545c66"
        d="M30 14.5a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1zM46 14.5a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
      ></path>
      <path fill="#e29f33" d="M60 63.5H48l6-5z"></path>
      <path fill="#edab37" d="M60 13.5v50l-6-5v-45z"></path>
      <path fill="#f6bb42" d="M54 13.5v45l-6 5v-50z"></path>
      <path
        fill="#ffce54"
        d="M23.01 39.5c1.101 0 2-.89 2-2v-2H16v2a2 2 0 002 2h1V56a1.504 1.504 0 003.01 0V39.5zM48 13.5v50H4v-50h42zm-11 31V34.49c0-3.87-3.13-7-7-7V56c0 .83.67 1.5 1.5 1.5S33 56.83 33 56V44.5z"
      ></path>
      <path
        fill="#656d78"
        d="M34 10.5a1 1 0 01-1-1c0-3.859-3.141-7-7-7s-7 3.141-7 7a1 1 0 11-2 0c0-4.963 4.037-9 9-9s9 4.037 9 9a1 1 0 01-1 1z"
      ></path>
      <path
        fill="#656d78"
        d="M18 21.5a1 1 0 01-1-1v-11a1 1 0 112 0v11a1 1 0 01-1 1zM34 21.5a1 1 0 01-1-1v-11a1 1 0 112 0v11a1 1 0 01-1 1z"
      ></path>
      <g fill="#545c66">
        <path d="M16.004 38.503a1 1 0 01-1-1V27.497a1 1 0 112 0v10.006a1 1 0 01-1 1zM25.007 38.503a1 1 0 01-1-1V27.497a1 1 0 112 0v10.006a1 1 0 01-1 1zM19.004 36.501a1 1 0 01-1-1v-8.004a1 1 0 112 0v8.004a1 1 0 01-1 1zM22.007 36.501a1 1 0 01-1-1v-8.004a1 1 0 112 0v8.004a1 1 0 01-1 1zM22.51 39H18.5v17c0 1.103.901 2 2.01 2 1.103 0 2-.897 2-2zM33 44h-4v12c0 1.103.897 2 2 2s2-.897 2-2z"></path>
      </g>
      <path
        fill="#656d78"
        d="M25.01 34.5H16a1 1 0 00-1 1v2c0 1.654 1.346 3 3 3h5.01c1.654 0 3-1.346 3-3v-2a1 1 0 00-1-1zM30 26.49c-.553 0-1 .457-1 1.01v17a1 1 0 001 1h7a1 1 0 001-1V34.49c0-4.411-3.589-8-8-8z"
      ></path>
    </svg>
  );
}

const TakeAwayIcon = props => <Icon component={TakeAwaySVG} {...props} />;

export default TakeAwayIcon;