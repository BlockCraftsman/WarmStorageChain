// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgUpdateResource } from "./types/warmstoragechain/warmstoragechain/tx";
import { MsgCreateResource } from "./types/warmstoragechain/warmstoragechain/tx";
import { MsgDeleteResource } from "./types/warmstoragechain/warmstoragechain/tx";

import { Params as typeParams} from "./types"
import { Resource as typeResource} from "./types"

export { MsgUpdateResource, MsgCreateResource, MsgDeleteResource };

type sendMsgUpdateResourceParams = {
  value: MsgUpdateResource,
  fee?: StdFee,
  memo?: string
};

type sendMsgCreateResourceParams = {
  value: MsgCreateResource,
  fee?: StdFee,
  memo?: string
};

type sendMsgDeleteResourceParams = {
  value: MsgDeleteResource,
  fee?: StdFee,
  memo?: string
};


type msgUpdateResourceParams = {
  value: MsgUpdateResource,
};

type msgCreateResourceParams = {
  value: MsgCreateResource,
};

type msgDeleteResourceParams = {
  value: MsgDeleteResource,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgUpdateResource({ value, fee, memo }: sendMsgUpdateResourceParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgUpdateResource: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgUpdateResource({ value: MsgUpdateResource.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgUpdateResource: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgCreateResource({ value, fee, memo }: sendMsgCreateResourceParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateResource: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateResource({ value: MsgCreateResource.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateResource: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgDeleteResource({ value, fee, memo }: sendMsgDeleteResourceParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgDeleteResource: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgDeleteResource({ value: MsgDeleteResource.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgDeleteResource: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgUpdateResource({ value }: msgUpdateResourceParams): EncodeObject {
			try {
				return { typeUrl: "/blockcraftsman.warmstoragechain.warmstoragechain.MsgUpdateResource", value: MsgUpdateResource.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgUpdateResource: Could not create message: ' + e.message)
			}
		},
		
		msgCreateResource({ value }: msgCreateResourceParams): EncodeObject {
			try {
				return { typeUrl: "/blockcraftsman.warmstoragechain.warmstoragechain.MsgCreateResource", value: MsgCreateResource.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateResource: Could not create message: ' + e.message)
			}
		},
		
		msgDeleteResource({ value }: msgDeleteResourceParams): EncodeObject {
			try {
				return { typeUrl: "/blockcraftsman.warmstoragechain.warmstoragechain.MsgDeleteResource", value: MsgDeleteResource.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgDeleteResource: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Params: getStructure(typeParams.fromPartial({})),
						Resource: getStructure(typeResource.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			BlockcraftsmanWarmstoragechainWarmstoragechain: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;