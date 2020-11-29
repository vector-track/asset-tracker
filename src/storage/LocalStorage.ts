import {Storage, StorageType, StorageOptions} from './Storage';
const LOCAL_STORAGE_KEY = "at_storage";

type StorageBuffer = {
  [key:string]: string;
};

class LocalStorage extends Storage {
  constructor() {
    super(StorageType.LocalStorage);
  }

  setUp(storageOptions: StorageOptions) {
    if (storageOptions.storageType !== StorageType.LocalStorage) {
      throw Error("Storage type mismatch!");
    }
  }

  getBuffer(): StorageBuffer {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}')
  }

  getAllAssetsInternal(): string[] {
    const assets: string[] = [];
    const storage : StorageBuffer = this.getBuffer();
    for (var name in storage) {
      assets.push(storage[name]);
    }
    return assets;
  }

  getAssetInternal(assetName: string): string|null {
    const storage : StorageBuffer = this.getBuffer();
    const asset = storage[assetName];
    if (asset) {
      return asset;
    } else {
      return null;
    }
  }

  writeAssetInternal(assetName: string, asset: string) {
    const storage : StorageBuffer = this.getBuffer();
    storage[assetName] = asset;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
  }
}

export default LocalStorage;
