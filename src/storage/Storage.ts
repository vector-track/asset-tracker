import {Asset} from '../tracking/Asset';
enum StorageType {
  LocalStorage = 1
};

type StorageOptions = {
  storageType: StorageType,
};

abstract class Storage {
  constructor(private storageType: StorageType) {}


  getAsset(assetName: string) : Asset|null {
    var assetStore = this.getAssetInternal(assetName);
    if (!assetStore) return null;
    return Asset.fromSerial(assetStore);
  }
  writeAsset(asset: Asset) {
    return this.writeAssetInternal(asset.name(), asset.toSerial());
  }

  abstract setUp(storageOptions: StorageOptions): void;

  abstract getAssetInternal(assetName: string): string|null;
  abstract writeAssetInternal(assetName: string, asset: string): void;
}

export {StorageType, Storage};
export type {StorageOptions}
