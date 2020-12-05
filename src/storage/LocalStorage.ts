import {Storage, StorageType, StorageOptions} from './Storage';
const ASSET_KEY = "at_storage";
const ANNOTATION_KEY = "an_storage";

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

  getAssetBuffer(): StorageBuffer {
    return JSON.parse(window.localStorage.getItem(ASSET_KEY) ?? '{}')
  }

  getAnnotationBuffer(): StorageBuffer {
    return JSON.parse(window.localStorage.getItem(ANNOTATION_KEY) ?? '{}')
  }

  getAllAssetsInternal(): string[] {
    const assets: string[] = [];
    const storage : StorageBuffer = this.getAssetBuffer();
    for (var name in storage) {
      assets.push(storage[name]);
    }
    return assets;
  }

  getAssetInternal(assetName: string): string|null {
    const storage : StorageBuffer = this.getAssetBuffer();
    const asset = storage[assetName];
    if (asset) {
      return asset;
    } else {
      return null;
    }
  }

  writeAssetInternal(assetName: string, asset: string) {
    const storage : StorageBuffer = this.getAssetBuffer();
    storage[assetName] = asset;
    window.localStorage.setItem(ASSET_KEY, JSON.stringify(storage));
  }

  getAnnotationInternal(assetName: string): string|null {
    const storage : StorageBuffer = this.getAnnotationBuffer();
    const annotation = storage[assetName];
    return annotation ?? null;
  }

  setAnnotationInternal(assetName: string, freeformText: string) {
    const storage : StorageBuffer = this.getAnnotationBuffer();
    storage[assetName] = freeformText;
    window.localStorage.setItem(ANNOTATION_KEY, JSON.stringify(storage));
  }
}

export default LocalStorage;
