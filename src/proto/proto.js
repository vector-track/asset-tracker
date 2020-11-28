/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.AssetProto = (function() {

    /**
     * Properties of an AssetProto.
     * @exports IAssetProto
     * @interface IAssetProto
     * @property {string|null} [name] AssetProto name
     * @property {Array.<string>|null} [children] AssetProto children
     */

    /**
     * Constructs a new AssetProto.
     * @exports AssetProto
     * @classdesc Represents an AssetProto.
     * @implements IAssetProto
     * @constructor
     * @param {IAssetProto=} [properties] Properties to set
     */
    function AssetProto(properties) {
        this.children = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AssetProto name.
     * @member {string} name
     * @memberof AssetProto
     * @instance
     */
    AssetProto.prototype.name = "";

    /**
     * AssetProto children.
     * @member {Array.<string>} children
     * @memberof AssetProto
     * @instance
     */
    AssetProto.prototype.children = $util.emptyArray;

    /**
     * Creates a new AssetProto instance using the specified properties.
     * @function create
     * @memberof AssetProto
     * @static
     * @param {IAssetProto=} [properties] Properties to set
     * @returns {AssetProto} AssetProto instance
     */
    AssetProto.create = function create(properties) {
        return new AssetProto(properties);
    };

    /**
     * Encodes the specified AssetProto message. Does not implicitly {@link AssetProto.verify|verify} messages.
     * @function encode
     * @memberof AssetProto
     * @static
     * @param {IAssetProto} message AssetProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssetProto.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.children != null && message.children.length)
            for (var i = 0; i < message.children.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.children[i]);
        return writer;
    };

    /**
     * Encodes the specified AssetProto message, length delimited. Does not implicitly {@link AssetProto.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AssetProto
     * @static
     * @param {IAssetProto} message AssetProto message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AssetProto.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AssetProto message from the specified reader or buffer.
     * @function decode
     * @memberof AssetProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AssetProto} AssetProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssetProto.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AssetProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                if (!(message.children && message.children.length))
                    message.children = [];
                message.children.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AssetProto message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AssetProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AssetProto} AssetProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AssetProto.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AssetProto message.
     * @function verify
     * @memberof AssetProto
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AssetProto.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.children != null && message.hasOwnProperty("children")) {
            if (!Array.isArray(message.children))
                return "children: array expected";
            for (var i = 0; i < message.children.length; ++i)
                if (!$util.isString(message.children[i]))
                    return "children: string[] expected";
        }
        return null;
    };

    /**
     * Creates an AssetProto message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AssetProto
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AssetProto} AssetProto
     */
    AssetProto.fromObject = function fromObject(object) {
        if (object instanceof $root.AssetProto)
            return object;
        var message = new $root.AssetProto();
        if (object.name != null)
            message.name = String(object.name);
        if (object.children) {
            if (!Array.isArray(object.children))
                throw TypeError(".AssetProto.children: array expected");
            message.children = [];
            for (var i = 0; i < object.children.length; ++i)
                message.children[i] = String(object.children[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from an AssetProto message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AssetProto
     * @static
     * @param {AssetProto} message AssetProto
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AssetProto.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.children = [];
        if (options.defaults)
            object.name = "";
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.children && message.children.length) {
            object.children = [];
            for (var j = 0; j < message.children.length; ++j)
                object.children[j] = message.children[j];
        }
        return object;
    };

    /**
     * Converts this AssetProto to JSON.
     * @function toJSON
     * @memberof AssetProto
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AssetProto.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AssetProto;
})();

module.exports = $root;
