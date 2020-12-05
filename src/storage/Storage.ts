import Asset from '../tracking/Asset';
enum StorageType {
  LocalStorage = 1
};

type StorageOptions = {
  storageType: StorageType,
};

abstract class Storage {
  constructor(private storageType: StorageType) {}

  getAllAssets() : Asset[] {
    const assets: Asset[] = [];
    for (const assetString of this.getAllAssetsInternal()) {
      assets.push(Asset.fromSerial(assetString));
    }
    return assets;
  }

  getAsset(assetName: string) : Asset|null {
    var assetStore = this.getAssetInternal(assetName);
    if (!assetStore) return null;
    return Asset.fromSerial(assetStore);
  }
  writeAsset(asset: Asset) {
    return this.writeAssetInternal(asset.name, asset.toSerial());
  }

  createChild(parent: Asset, child: Asset) {
    if (!parent.maybeAddChild(child)) return
    this.writeAsset(parent);
    this.writeAsset(child);
  }

  getChildren(parent: Asset): Asset[] {
    // Do something smarter if this scales.
    const children: Asset[] = [];
    for (const child of parent.children) {
      const asset = this.getAssetInternal(child);
      if (asset) {
        children.push(Asset.fromSerial(asset));
      }
    }
    return children;
  }

  abstract setUp(storageOptions: StorageOptions): void;

  abstract getAssetInternal(assetName: string): string|null;
  abstract writeAssetInternal(assetName: string, asset: string): void;
  abstract getAllAssetsInternal(): string[];
}

export {StorageType, Storage};
export type {StorageOptions}
