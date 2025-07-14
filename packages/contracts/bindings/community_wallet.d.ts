export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CACWNNSVIL3EMEJUKL4V6ZBBGL4M66GR65IHG5JTFD6AF7OTVETG564G";
    };
};
export type Group = {
    id: string;
    name: string;
    creator: string;
    members: Array<string>;
    total_balance: bigint;
    total_yield: bigint;
    blend_pool_address: string | null;
    auto_invest_enabled: boolean;
    is_active: boolean;
};
export type Member = {
    address: string;
    balance: bigint;
    is_admin: boolean;
    joined_at: bigint;
};
export type DataKey = {
    tag: "Group";
    values: readonly [string];
} | {
    tag: "GroupMembers";
    values: readonly [string];
} | {
    tag: "UserGroups";
    values: readonly [string];
} | {
    tag: "GroupCount";
    values: readonly [];
} | {
    tag: "BlendPoolAddress";
    values: readonly [];
};
export declare class Client {
    readonly options: {
        networkPassphrase: string;
        contractId: string;
        rpcUrl?: string;
    };
    constructor(options: {
        networkPassphrase: string;
        contractId: string;
        rpcUrl?: string;
    });
    createGroup(params: {
        creator: string;
        group_id: string;
        name: string;
        auto_invest_enabled: boolean;
    }): Promise<{
        success: boolean;
    }>;
    joinGroup(params: {
        member: string;
        group_id: string;
    }): Promise<{
        success: boolean;
    }>;
    contribute(params: {
        contributor: string;
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<{
        success: boolean;
    }>;
    getGroup(params: {
        group_id: string;
    }): Promise<Group | null>;
    getGroupBalance(params: {
        group_id: string;
    }): Promise<bigint>;
    getUserGroups(params: {
        user: string;
    }): Promise<string[]>;
    getGroupMembers(params: {
        group_id: string;
    }): Promise<string[]>;
    isGroupAdmin(params: {
        group_id: string;
        user: string;
    }): Promise<boolean>;
    withdraw(params: {
        member: string;
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<{
        success: boolean;
    }>;
    getMemberBalance(params: {
        group_id: string;
        member: string;
    }): Promise<bigint>;
    getGroupCount(): Promise<number>;
    setBlendPool(params: {
        admin: string;
        blend_pool_address: string;
    }): Promise<{
        success: boolean;
    }>;
    getBlendPool(): Promise<string | null>;
    depositToBlend(params: {
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<{
        success: boolean;
    }>;
    withdrawFromBlend(params: {
        admin: string;
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<{
        success: boolean;
    }>;
    distributeYield(params: {
        group_id: string;
    }): Promise<{
        success: boolean;
    }>;
    getGroupYield(params: {
        group_id: string;
    }): Promise<bigint>;
    isAutoInvestEnabled(params: {
        group_id: string;
    }): Promise<boolean>;
    manualInvestToBlend(params: {
        admin: string;
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<string>;
    getInvestmentHistory(params: {
        group_id: string;
    }): Promise<string[]>;
    withdrawBlendInvestment(params: {
        admin: string;
        group_id: string;
        amount: bigint;
        token_address: string;
    }): Promise<string>;
}
//# sourceMappingURL=community_wallet.d.ts.map