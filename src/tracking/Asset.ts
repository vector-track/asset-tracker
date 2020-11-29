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

class Asset {
  name(): string { return this.assetStore.name; }

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

export default Asset;
