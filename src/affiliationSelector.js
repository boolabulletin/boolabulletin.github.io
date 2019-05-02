import React from 'react';
import ReactDOM from 'react-dom';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import affiliationOptions from './affiliation.js';

class AffiliationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      affiliation: '',
      labelWidth: 0
    };
  }

  handleChange = event => {
    this.setState({affiliation: event.target.value});
    this.props.save(event);
  }
  
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef.current).offsetWidth
    });
  }

  render() {
    this.InputLabelRef = React.createRef();
    return (
      <div>
        <FormControl variant="outlined" fullWidth margin="dense">
          <InputLabel ref={this.InputLabelRef} htmlFor="affiliation-selector">
            Affiliation
          </InputLabel>
          <Select
            value={this.state.affiliation}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="affiliation"
                id="affiliation-selector"
              />
            }
          >
            {affiliationOptions.map( affil => (
                <MenuItem key={affil.option} value={affil.option}>{affil.option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default AffiliationSelector;
