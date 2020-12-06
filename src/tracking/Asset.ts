import {AssetProto} from '../proto/proto.js';

function ab2str(buf: Uint8Array): string {
  var binStr = "";
  for (var i = 0; i < buf.length; i++) {
    binStr += String.fromCharCode(buf[i]);
  }
  return binStr;
}

function str2ab(str: string): Uint8Array  {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

/* Wrapping class around the core Asset proto. All reads and writes to an asset
 * should go through this class.
 */
class Asset {
  get name(): string { return this.assetStore.name; }
  get children(): string[] { return this.assetStore.children; }

  hasParent(): boolean { return this.assetStore.parent !== "" }
  get parent(): string { return this.assetStore.parent; }
  set parent(name: string) {
    this.assetStore.parent = name;
  }

  /* Returns a boolean indicating whether or not the child has been added. */
  maybeAddChild(child: Asset) : boolean {
    if (this.assetStore.children.includes(child.name)) return false;
    this.assetStore.children.push(child.name);
    child.parent = this.name;
    return true;
  }

  static createWithName(name: string): Asset {
      const assetProto = new AssetProto();
      assetProto.name = name;
      return new Asset(assetProto);
  }

  static fromSerial(serial: string): Asset {
    return new Asset(AssetProto.decode(str2ab(serial)));
  }

  toSerial(): string {
      return ab2str(AssetProto.encode(this.assetStore).finish());
  }

  private constructor(private assetStore: AssetProto) {}
}

export {Asset};
