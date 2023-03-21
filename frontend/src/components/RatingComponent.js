import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiRating-iconFilled': {
    color: '#0495B2',
  },
}));

// const customIcons = {
//   1: {
//     icon: <SentimentVeryDissatisfiedIcon fontSize='large' style={{color: '#71DAF9', '&:hover': {color: 'error'},}} />,
//     label: 'Very Dissatisfied',
//   },
//   2: {
//     icon: <SentimentDissatisfiedIcon fontSize='large' style={{color: '#68CDEB', '&:hover': {color: 'error'},}}/>,
//     label: 'Dissatisfied',
//   },
//   3: {
//     icon: <SentimentSatisfiedIcon fontSize='large' style={{color: '#45C6E0', '&:hover': {color: 'warning'},}} />,
//     label: 'Neutral',
//   },
//   4: {
//     icon: <SentimentSatisfiedAltIcon fontSize='large' style={{color: '#12AAC9', '&:hover': {color: 'success'},}} />,
//     label: 'Satisfied',
//   },
//   5: {
//     icon: <SentimentVerySatisfiedIcon fontSize='large' style={{color: '#0495B2', '&:hover': {color: 'success'},}} />,
//     label: 'Very Satisfied',
//   },
// };

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon fontSize='large' color='#71DAF9' />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize='large' color='#68CDEB'/>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize='large' color='#45C6E0'/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize='large' color='#12AAC9'/>,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize='large' color='#0495B2'/>,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({handleInputChange, name}) {
  return (
    <StyledRating
      id="rating"
      name={name}
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      //highlightSelectedOnly
      onChange={handleInputChange}
    />
  );
}