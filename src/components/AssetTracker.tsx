import React from 'react';
import LocalStorage from '../storage/LocalStorage';
import {Storage} from '../storage/Storage';

import CreateAssetForm from './CreateAssetForm';
import AssetSelector from './AssetSelector';
import {Asset} from '../tracking/Asset';
import EditAnnotationForm from './EditAnnotationForm';

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
  annotation?: string;
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
    return (
      <React.Fragment>
        {this.renderHead()}
        <div className="AssetTracker-body">
            {this.renderBody()}
        </div>
      </React.Fragment>
    );
  }

  renderHead() {
    return (<div className="AssetTracker-navbar">
      <div onClick={() => this.toggleAssetView(AssetView.Existing)}>
        {this.hasCurrentAsset() ?
          (<h1>Current Asset: {this.state.currentAsset!.name}</h1>)
          : <h1>No Asset Selected</h1>}
      </div>
      { this.state.assetView !== AssetView.New && this.hasCurrentAsset()
        && <h2 className="AssetTracker-navbar-all" onClick={() => this.toggleAssetView(AssetView.New)}>
              All Assets
           </h2>}
    </div>)
  }
  renderBody() {
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
    this.setState({
      currentAsset: asset,
      assetView: AssetView.Existing,
      children: this.state.storage.getChildren(asset),
      annotation: this.state.storage.getAnnotation(asset.name)
    });
  }

  toggleAssetView(nextView: AssetView) {
    if (nextView !== this.state.assetView) {
      this.syncState(nextView);
    }
  }

  renderCurrentAsset(currentAsset: Asset) {
    return (
      <React.Fragment>
        <EditAnnotationForm storage={this.state.storage} parent={this.state.currentAsset} annotation={this.state.annotation} />
        <h2>Children: </h2>
        <AssetSelector assets={this.state.children ?? []} onSelection={this.setCurrentAsset}/>
        <CreateAssetForm storage={this.state.storage} parent={this.state.currentAsset} syncState={() => this.syncState(AssetView.Existing)} />
      </React.Fragment>
    );
  }

  renderNoAsset() {
    return (
      <React.Fragment>
        <AssetSelector assets={this.state.assets} onSelection={this.setCurrentAsset}/>
        <CreateAssetForm storage={this.state.storage} parent={this.state.currentAsset} syncState={() => this.syncState(AssetView.New)} />
      </React.Fragment>
    );
  }
}

export default AssetTracker;
