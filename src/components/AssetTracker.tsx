import React from 'react';
import LocalStorage from '../storage/LocalStorage';
import {Storage} from '../storage/Storage';

import CreateAssetForm from './CreateAssetForm';
import AssetSelector from './AssetSelector';
import Asset from '../tracking/Asset';

enum AssetView {
  New = 1,
  Existing
};

type AssetTrackerProps  = {
};

type AssetTrackerState = {
  storage: Storage;
  assets: Asset[];
  currentAsset?: Asset;
  children?: Asset[];
  assetView: AssetView;
};

class AssetTracker extends React.Component<AssetTrackerProps, AssetTrackerState> {
  constructor(props: AssetTrackerProps) {
    super(props);
    this.syncState = this.syncState.bind(this);
    this.setCurrentAsset = this.setCurrentAsset.bind(this);
    this.toggleAssetView = this.toggleAssetView.bind(this);

    const storage = new LocalStorage();
    this.state = {
      storage: storage,
      assets: storage.getAllAssets(),
      assetView: AssetView.Existing
    };
  }
  hasCurrentAsset() {
    return this.state.currentAsset;
  }

  render() {
    switch (this.state.assetView) {
      case (AssetView.New):
        return this.renderNoAsset();
      case (AssetView.Existing): {
        if (this.hasCurrentAsset()) {
          return this.renderCurrentAsset(this.state.currentAsset!);
        } else {
          return this.renderNoAsset();
        }
      }
    }
  }

  async syncState(nextView: AssetView) {
    switch (nextView) {
      case (AssetView.New): {
        const assets = this.state.storage.getAllAssets();
        return this.setState({
          assets: assets,
          assetView: nextView
        });
      }
      case AssetView.Existing: {
        if (this.hasCurrentAsset()) {
          const asset = this.state.storage.getAsset(this.state.currentAsset!.name);
          if (asset) {
            this.setCurrentAsset(asset);
          }
        }
      }
    }
  }

  setCurrentAsset(asset: Asset) {
    this.setState({currentAsset: asset, assetView: AssetView.Existing, children: this.state.storage.getChildren(asset)});
  }

  toggleAssetView(nextView: AssetView) {
    if (nextView !== this.state.assetView) {
      this.syncState(nextView);
    }
  }

  renderCurrentAsset(currentAsset: Asset) {
    return (
      <div>
        <button onClick={() => this.toggleAssetView(AssetView.New)}>Create New</button>
        <h1>Current Asset: {currentAsset!.name}</h1>
        <h2>Children: </h2>
        <AssetSelector assets={this.state.children ?? []} onSelection={this.setCurrentAsset}/>
        <CreateAssetForm storage={this.state.storage} parent={this.state.currentAsset} syncState={() => this.syncState(AssetView.Existing)} />
      </div>
    );
  }

  renderNoAsset() {
    return (
      <div>
        {
          this.hasCurrentAsset() ? <button onClick={() => this.toggleAssetView(AssetView.Existing)}>Asset</button>
                  :             <h1>No asset currently selected</h1>
                }
        <AssetSelector assets={this.state.assets} onSelection={this.setCurrentAsset}/>
        <CreateAssetForm storage={this.state.storage} parent={this.state.currentAsset} syncState={() => this.syncState(AssetView.New)} />
      </div>
    );
  }
}

export default AssetTracker;
