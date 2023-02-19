import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'


export default function FilterComponent() {
  const filters = ['Most Popular', 'Affordability', 'Newest', 'Highest Ratings'];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
<Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open filters">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <TuneIcon color="#0495b2" fontSize="large"></TuneIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {filters.map((filter) => (
                    <MenuItem key={filter} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{filter}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
  );
}

