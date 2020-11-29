import React from 'react';
import LocalStorage from '../storage/LocalStorage';
import {Storage} from '../storage/Storage';

import CreateAssetForm from './CreateAssetForm';
import AssetSelector from './AssetSelector';
import Asset from '../tracking/Asset';

type AssetTrackerProps  = {
};

type AssetTrackerState = {
  storage: Storage;
  assets: Asset[];
  currentAsset?: Asset;
};

class AssetTracker extends React.Component<AssetTrackerProps, AssetTrackerState> {
  constructor(props: AssetTrackerProps) {
    super(props);
    this.syncState = this.syncState.bind(this);
    this.setCurrentAsset = this.setCurrentAsset.bind(this);

    const storage = new LocalStorage();
    this.state = {
      storage: storage,
      assets: storage.getAllAssets(),
    };
  }
  hasCurrentAsset() {
    return this.state.currentAsset;
  }

  render() {
    return (
      this.hasCurrentAsset() ? this.renderCurrentAsset() : this.renderNoAsset()
    )
  }

  renderCurrentAsset() {
    return <h1>Current Asset: {this.state.currentAsset!.name()}</h1>;
  }

  syncState() {
    this.setState({
      assets: this.state.storage.getAllAssets()
    })
  }

  setCurrentAsset(asset: Asset) {
    this.setState({currentAsset: asset});
  }

  renderNoAsset() {
    return (
      <div>
        <h1>No asset currently selected</h1>
        <AssetSelector assets={this.state.assets} onSelection={this.setCurrentAsset}/>
        <CreateAssetForm storage={this.state.storage} syncState={this.syncState} />
      </div>
    );
  }
}

export default AssetTracker;
