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

  getAssetInternal(assetName: string): string|null {
    const storage : StorageBuffer = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '');
    const asset = storage[assetName];
    if (asset) {
      return asset;
    } else {
      return null;
    }
  }

  writeAssetInternal(assetName: string, asset: string) {
    const storage : StorageBuffer = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}');
    storage[assetName] = asset;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
  }
}

export default LocalStorage;
