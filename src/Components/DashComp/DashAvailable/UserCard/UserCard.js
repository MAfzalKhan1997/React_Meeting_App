// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import MobileStepper from '@material-ui/core/MobileStepper';
// import Paper from '@material-ui/core/Paper';
// // import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

// import IconButton from '@material-ui/core/IconButton';
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
//   },
//   {
//     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

// const styles = theme => ({
//   root: {
//     maxWidth: 300,
//     flexGrow: 1,
//     margin: '0px'
//   },
// //   header: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     height: 50,
// //     paddingLeft: theme.spacing.unit * 4,
// //     backgroundColor: theme.palette.background.default,
// //   },
//   img: {
//     height: 300,
//     display: 'block',
//     maxWidth: 300,
//     overflow: 'hidden',
//     width: '100%',
//   },
// });

// class UserCard extends React.Component {
//   state = {
//     activeStep: 0,
//   };

//   handleNext = () => {
//     this.setState(prevState => ({
//       activeStep: prevState.activeStep + 1,
//     }));
//   };

//   handleBack = () => {
//     this.setState(prevState => ({
//       activeStep: prevState.activeStep - 1,
//     }));
//   };

//   handleStepChange = activeStep => {
//     this.setState({ activeStep });
//   };

//   render() {
//     const { classes, theme } = this.props;
//     const { activeStep } = this.state;
//     const maxSteps = tutorialSteps.length;

//     return (
//       <div className={classes.root}>
//         <Paper square elevation={1} > 
//         <AutoPlaySwipeableViews
//           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//           index={activeStep}
//           onChangeIndex={this.handleStepChange}
//           enableMouseEvents
//           >
//           {tutorialSteps.map((step, index) => (
//               <div key={step.label}>
//               {Math.abs(activeStep - index) <= 2 ? (
//                   <img className={classes.img} src={step.imgPath} alt={step.label} />
//               ) : null}
//             </div>
//           ))}
//         </AutoPlaySwipeableViews>
//         Fullname
//         <br/>
//         Nickna
//         <MobileStepper
//         //   steps={maxSteps}
//           position="static"
//         //   activeStep={activeStep}
//         //   className={classes.mobileStepper}
//           nextButton={
//             <IconButton size="small" onClick={this.handleBack} style={{color:'green',margin:'-60px'}}>
//               <CheckIcon/>
//             </IconButton>
//           }
//           backButton={
//             <IconButton size="small" onClick={this.handleBack} style={{color:'red',marginBottom:'-100px'}}>
//               <CloseIcon/>
//             </IconButton>
//           }
//         />
//           </Paper>
//       </div>
//     );
//   }
// }

// UserCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(UserCard);
