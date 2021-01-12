import React from 'react';
import LocalStorage from '../storage/LocalStorage';
import {Storage} from '../storage/Storage';

import CreateAssetForm from './CreateAssetForm';
import AssetSelector from './AssetSelector';
import {Asset} from '../tracking/Asset';
import EditAnnotationForm from './EditAnnotationForm';

import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import {Tooltip, IconButton} from '@material-ui/core';

enum AssetView {
  Global = 1,
  Existing,
  Create
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
      <div className="AssetTracker">
        {this.renderHead()}
        <div className="AssetTracker-body">
            {this.renderBody()}
        </div>
      </div>
    );
  }

  renderHead() {
    return (<div className="AssetTracker-navbar">
      <div className="AssetTracker-navbar-asset">
          {this.hasCurrentAsset() ?
          (<React.Fragment>
              {this.state.currentAsset!.hasParent() &&
                <React.Fragment>
                  <span onClick={() => this.setCurrentAssetByName(this.state.currentAsset!.parent)}>
                    {this.state.currentAsset!.parent}
                  </span>
                  &nbsp;&gt;&nbsp;
                </React.Fragment>}
              <strong onClick={() => this.toggleAssetView(AssetView.Existing)}>
                {this.state.currentAsset!.name}
              </strong>
          </React.Fragment>)
            : <React.Fragment>No Asset Selected</React.Fragment>}
      </div>
      <div className="AssetTracker-navbar-buttons">
        <Tooltip title="Create" className="AssetTracker-navbar-all" onClick={() => this.toggleAssetView(AssetView.Create)}>
          <IconButton aria-label="create">
            <AddBoxIcon fontSize="inherit"/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Home" className="AssetTracker-navbar-all">
          <IconButton aria-label="home" onClick={() => this.toggleAssetView(AssetView.Global)}>
            <HomeIcon fontSize="inherit"/>
          </IconButton>
        </Tooltip>
      </div>
    </div>)
  }

  renderBody() {
    switch (this.state.assetView) {
      case (AssetView.Global):
        return this.renderNoAsset();
      case (AssetView.Existing): {
        if (this.hasCurrentAsset()) {
          return this.renderCurrentAsset(this.state.currentAsset!);
        } else {
          return this.renderNoAsset();
        }
      }
      case (AssetView.Create): {
        return this.renderCreateAsset();
      }
    }
  }

  async syncState(nextView: AssetView) {
    switch (nextView) {
      case (AssetView.Global): {
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
        return;
      }
      case AssetView.Create: {
        return this.setState({
          assetView: nextView
        });
      }
    }
  }

  setCurrentAssetByName(assetName: string) {
    const asset = this.state.storage.getAsset(assetName);
    if (!asset) return;
    this.setCurrentAsset(asset!);
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
      <div className="AssetTracker-current">
        <div className="AssetTracker-current-annotation">
          <EditAnnotationForm storage={this.state.storage}
                              parent={this.state.currentAsset}
                              annotation={this.state.annotation} />
        </div>
        <div className="AssetTracker-current-metadata">
          <div className="AssetTracker-current-metadata-children">
            <h2>Children: </h2>
            <AssetSelector assets={this.state.children ?? []} onSelection={this.setCurrentAsset}/>
          </div>
        </div>
      </div>
    );
  }

  renderNoAsset() {
    return (
      <React.Fragment>
        <AssetSelector assets={this.state.assets} onSelection={this.setCurrentAsset}/>
      </React.Fragment>
    );
  }

  renderCreateAsset() {
    return (
      <React.Fragment>
        {this.hasCurrentAsset() && <h1>Create Child Asset Of:  {this.state.currentAsset!.name}</h1>}
        <CreateAssetForm storage={this.state.storage} parent={this.state.currentAsset} syncState={() => this.syncState(
          this.hasCurrentAsset() ? AssetView.Existing : AssetView.Global)} />
      </React.Fragment>
    );
  }
}

export default AssetTracker;
