import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT",
    }
};
export const Errors = {
    1: { message: "FailedToGetBalance" },
    2: { message: "InvalidAmount" },
    3: { message: "NoSupporters" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Constructor/Initialization Args for the contract's `__constructor` method */
    { owner, token_address }, 
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy({ owner, token_address }, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAABAAAAAAAAAAAAAAADUNvbnRyYWN0RXJyb3IAAAAAAAADAAAAAAAAABJGYWlsZWRUb0dldEJhbGFuY2UAAAAAAAEAAAAAAAAADUludmFsaWRBbW91bnQAAAAAAAACAAAAAAAAAAxOb1N1cHBvcnRlcnMAAAAD",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAAAAAAAAAAABU93bmVyAAAAAAAAAAAAAAAAAAAMVG9rZW5BZGRyZXNzAAAAAAAAAAAAAAAKU3VwcG9ydGVycwAA",
            "AAAAAQAAAAAAAAAAAAAACVN1cHBvcnRlcgAAAAAAAAIAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAL",
            "AAAAAAAAAAAAAAANX19jb25zdHJ1Y3RvcgAAAAAAAAIAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAANdG9rZW5fYWRkcmVzcwAAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAAJZ2V0X293bmVyAAAAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAARZ2V0X3Rva2VuX2FkZHJlc3MAAAAAAAAAAAAAAQAAABM=",
            "AAAAAAAAAAAAAAALZ2V0X2JhbGFuY2UAAAAAAAAAAAEAAAPpAAAACwAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
            "AAAAAAAAAAAAAAAOZ2V0X3N1cHBvcnRlcnMAAAAAAAAAAAABAAAD6QAAA+oAAAfQAAAACVN1cHBvcnRlcgAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA==",
            "AAAAAAAAAAAAAAAKYnV5X2NvZmZlZQAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADUNvbnRyYWN0RXJyb3IAAAA=",
            "AAAAAAAAAAAAAAAId2l0aGRyYXcAAAAAAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANQ29udHJhY3RFcnJvcgAAAA=="]), options);
        this.options = options;
    }
    fromJSON = {
        get_owner: (this.txFromJSON),
        get_token_address: (this.txFromJSON),
        get_balance: (this.txFromJSON),
        get_supporters: (this.txFromJSON),
        buy_coffee: (this.txFromJSON),
        withdraw: (this.txFromJSON)
    };
}
