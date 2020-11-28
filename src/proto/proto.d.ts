import * as $protobuf from "protobufjs";
/** Properties of an AssetProto. */
export interface IAssetProto {

    /** AssetProto name */
    name?: (string|null);

    /** AssetProto children */
    children?: (string[]|null);
}

/** Represents an AssetProto. */
export class AssetProto implements IAssetProto {

    /**
     * Constructs a new AssetProto.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAssetProto);

    /** AssetProto name. */
    public name: string;

    /** AssetProto children. */
    public children: string[];

    /**
     * Creates a new AssetProto instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AssetProto instance
     */
    public static create(properties?: IAssetProto): AssetProto;

    /**
     * Encodes the specified AssetProto message. Does not implicitly {@link AssetProto.verify|verify} messages.
     * @param message AssetProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAssetProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AssetProto message, length delimited. Does not implicitly {@link AssetProto.verify|verify} messages.
     * @param message AssetProto message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAssetProto, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AssetProto message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AssetProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AssetProto;

    /**
     * Decodes an AssetProto message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AssetProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AssetProto;

    /**
     * Verifies an AssetProto message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AssetProto message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AssetProto
     */
    public static fromObject(object: { [k: string]: any }): AssetProto;

    /**
     * Creates a plain object from an AssetProto message. Also converts values to other types if specified.
     * @param message AssetProto
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AssetProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AssetProto to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
