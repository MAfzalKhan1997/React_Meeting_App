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


    render() {
        const { classes, updateText } = this.props;
        return (
            <div>
                <FormControl className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Person color='primary' />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" name='Nickname' label="Nickname"
                                onChange={(e) => updateText(e)}
                            />
                        </Grid>
                    </Grid>
                </FormControl>
                <FormControl className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <LocalPhone color='primary' />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" type='number' name='Contact' label="Contact"
                                // inputProps= {{maxLength:11}}
                                onChange={(e) => updateText(e)}
                            />
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
