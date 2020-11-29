
import React from 'react';
import {Storage} from '../storage/Storage';
import Asset from '../tracking/Asset';

type AssetSelectorProps  = {
  assets: Asset[];
};

type AssetSelectorState = {
};

class AssetSelector extends React.Component<AssetSelectorProps, AssetSelectorState> {
  constructor(props: AssetSelectorProps) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.assets.map((asset: Asset, key) => {
            return (<h1 key={key}>{asset.name()}</h1>)
          })
        }
      </div>
    );
  }
}

export default AssetSelector;
