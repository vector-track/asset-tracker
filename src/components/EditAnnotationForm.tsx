import React from 'react';
import {Storage} from '../storage/Storage';
import {Asset} from '../tracking/Asset';

import TextField from '@material-ui/core/TextField';

type EditAnnotationFormProps  = {
  storage?: Storage;
  annotation?: string;
  parent?: Asset;
};

type EditAnnotationFormState = {
  annotation: string;
};

class EditAnnotationForm extends React.Component<EditAnnotationFormProps, EditAnnotationFormState> {
  constructor(props: EditAnnotationFormProps) {
    super(props);

    this.state = {
      annotation: this.props.annotation ?? ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(oldProps: EditAnnotationFormProps) {
    if (oldProps.annotation !== this.props.annotation) {
      this.setState({
        annotation: this.props.annotation ?? ''
      });
    }
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({annotation: event.currentTarget.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.props.storage && this.props.parent) {
      this.props.storage.setAnnotation(this.props.parent.name, this.state.annotation);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="standard-textarea"
          label="Annotations"
          value={this.state.annotation}
          onChange={this.handleNameChange}
          multiline
          rows={10}
        />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default EditAnnotationForm;
