import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.white,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }, 

  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
  },
});

const images = [
  {
    url: 'https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-exlarge-169.jpg',
    title: 'Coffee',
  },
  {
    url: 'https://www.telegraph.co.uk/content/dam/food-and-drink/2016/02/16/juicespair_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg?imwidth=450',
    title: 'Juice',
  },
  {
    url: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/6/10/1/VB0304H_Watermelon-Cocktails_s4x3.jpg.rend.hgtvcom.616.462.suffix/1467180444844.jpeg',
    title: 'Cocktail',
  },
];

class Step3 extends Component {

  constructor() {
    super()

    this.state = {

    }
  }


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList spacing={1} className={classes.gridList} cols={3}>
          {images.map(image => (
            <GridListTile key={image.title} cols={1} rows={1} className={classes.image} >
              <img src={image.url} alt={image.title}/>
              <GridListTileBar
                title={image.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton style={{color:'white'}}>
                    <StarBorderIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>

    );
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step3);