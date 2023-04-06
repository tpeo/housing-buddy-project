import React from "react";
import {
    Button,
    Menu,
    MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { createTheme } from "@mui/material";

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        backgroundColor: "#0495b2"
      }
  }));
  
export default function HoverMenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  const navAll = () => {
    navigate('./allapartments');
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={navAll}
        onMouseEnter={handleClick}
        sx={{ my: 2, color: '#0495b2', display: 'block' }}
      >
        Open Menu
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem sx={{color: 'white'}} onClick={() => navigate('../compare')}>APARTMENT COMPARISON</MenuItem>
      </StyledMenu>
    </div>
  );
}
