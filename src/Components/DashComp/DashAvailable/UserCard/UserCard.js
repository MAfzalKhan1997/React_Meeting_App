import React from 'react';
import '../../DashComp.css';

import Carousel from 'nuka-carousel';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
  paper: {
    // maxWidth: 300,
    // flexGrow: 1,
    // width: '90%'
    // margin:'0px'
  }, 
});
 
class UserCard extends React.Component {
    
    constructor(){
        super()
        this.state={

        }
    }


  render() {
      const { classes, userObj } = this.props;

    return (
        <Paper className="paperDiv">
      <Carousel
      autoplay={true}
      wrapAround={true}
      autoplayInterval={2000}
      pauseOnHover={true}
      transitionMode='fade' 
      >
        
{        userObj.avatarURL.map((value, index) => (
            <img
              src={value}
            //   alt={`Slide ${index + 1}`}
              key={value} 
              style={{ height:300 }}
            />
          ))}
      </Carousel>
      <Grid container
            direction="row"
            justify="center"
            alignItems="center">

            <Grid item xs={2}>
              <IconButton style={{color:'red'}}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}> 
                <Grid direction="row" justify="center" alignItems="center">
                  <Typography variant="caption" >
                    <b>Afzal</b>
                  </Typography>
                </Grid>
                <Grid direction="row" justify="center" alignItems="center">
                  <Typography variant="caption" >{userObj.nickName}</Typography>
                </Grid> 
            </Grid>
            <Grid item xs={2}>
              <IconButton  style={{color:'green'}} onClick={() => alert()}>
                <CheckIcon />
              </IconButton>
            </Grid>

          </Grid>
      </Paper>
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);