import React from 'react';
import LocalStorage from '../storage/LocalStorage';
import {Storage} from '../storage/Storage';

import CreateAssetForm from './CreateAssetForm';

type AssetTrackerProps  = {
  currentAsset?: string;
};

type AssetTrackerState = {
  storage: Storage
};

class AssetTracker extends React.Component<AssetTrackerProps, AssetTrackerState> {
  constructor(props: AssetTrackerProps) {
    super(props);
    this.state = {
      storage: new LocalStorage()
    };
  }
  hasCurrentAsset() {
    return this.props.currentAsset ?? '' != '';
  }

  render() {
    return (
      this.hasCurrentAsset() ? this.renderCurrentAsset() : this.renderNoAsset()
    )
  }

  renderCurrentAsset() {
    return <h1>Current Asset: {this.props.currentAsset}</h1>;
  }

  renderNoAsset() {
    return (
      <div>
        <h1>No asset currently selected</h1>
        <CreateAssetForm storage={this.state.storage}/>
      </div>
    );
  }
}

export default AssetTracker;
