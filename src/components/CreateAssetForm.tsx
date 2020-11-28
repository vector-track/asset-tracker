import React from 'react';
import {Storage} from '../storage/Storage';
import {Asset} from '../tracking/Asset';

type CreateAssetFormProps  = {
  storage?: Storage;
};

type CreateAssetFormState = {
  assetName: string;
};

class CreateAssetForm extends React.Component<CreateAssetFormProps, CreateAssetFormState> {
  constructor(props: CreateAssetFormProps) {
    super(props);

    this.state = {assetName: ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({assetName: event.currentTarget.value});
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (this.props.storage) {
      this.props.storage.writeAsset(Asset.createWithName(this.state.assetName));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.assetName} onChange={this.handleNameChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateAssetForm;
