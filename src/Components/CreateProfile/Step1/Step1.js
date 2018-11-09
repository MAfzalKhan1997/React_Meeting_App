import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/PersonOutlined';
import LocalPhone from '@material-ui/icons/LocalPhoneOutlined';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class Step1 extends Component {

    constructor() {
        super()

        this.state = {

        }
    }


    //   static getDerivedStateFromProps() {

    //     AuthState()
    //     const userAvail = JSON.parse(localStorage.getItem("user"));

    //     return {
    //       userAvail,
    //     }
    //   }

    render() { 
        const { classes } = this.props;
        return (
            <div>
                <FormControl className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Person color='primary' />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Nickname" />
                        </Grid>
                    </Grid>
                </FormControl>
                <FormControl className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <LocalPhone color='primary' />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" type='number' label="Contact" />
                        </Grid>
                    </Grid>
                </FormControl>
            </div>
        );
    }
}

Step1.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Step1);
