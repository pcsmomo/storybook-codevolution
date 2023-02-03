import { styled, TextField, inputBaseClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

// This is how to use animation with MUI v5
// import { keyframes } from "@mui/system";
// const spin = keyframes`
//   100% {
//     transform: rotate(1turn);
//   }
// `;

interface StyleProps {
  width?: number;
}

export const useStyles = makeStyles<StyleProps>()((theme, { width }) => ({
  container: {
    display: 'inline-block',
    width,
  },
  limitsDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.grey[700],
    transition: 'opacity 0.5s, transform 0.5s',
    opacity: 1,
    transform: 'translateY(0)',
    // animation: `${spin} 1s infinite ease`,
    paddingLeft: theme.spacing(1.75),
    paddingRight: theme.spacing(1.75),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  [`& .${inputBaseClasses.root}`]: {
    backgroundColor: theme.palette.grey[50],
  },
}));
