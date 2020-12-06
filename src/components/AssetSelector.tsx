
import React from 'react';
import {Asset} from '../tracking/Asset';

type AssetSelectorProps  = {
  assets: Asset[];
  onSelection?: (this: void, asset: Asset) => void;
};

type AssetSelectorState = {
};

class AssetSelector extends React.Component<AssetSelectorProps, AssetSelectorState> {
  render() {
    return (
      <React.Fragment>
        {
          this.props.assets.map((asset: Asset, key) => {
            return (<h1 key={key} onClick={() => this.props.onSelection && this.props.onSelection(asset)}>{asset.name}</h1>)
          })
        }
      </React.Fragment>
    );
  }
}

export default AssetSelector;
