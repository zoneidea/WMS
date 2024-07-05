import { styled, css } from '@mui/system';

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

export const CustomButton = styled('button')(
    ({ theme }) => css`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${grey[50]};
    border-color: ${grey[300]};
  }

  &:active {
    background: ${grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${blue[200]};
    outline: none;
  }
`,
);