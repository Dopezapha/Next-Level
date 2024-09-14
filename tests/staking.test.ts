import { Clarinet, Tx, Chain, Account, types } from "@hirosystems/clarinet-sdk";
import { assert } from 'chai';

Clarinet.test({
    name: "Ensure that users can stake BTC",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        // Get the test accounts
        const user1 = accounts.get('wallet_1')!;

        // Mine a block with a stake-btc transaction
        let block = chain.mineBlock([
            Tx.contractCall('staking', 'stake-btc', [types.uint(1000)], user1.address)
        ]);

        // Check the receipts
        assert.equal(block.receipts.length, 1);
        assert.equal(block.height, 2);
        
        // Check that the stake was successful and returned the correct amount
        block.receipts[0].result.expectOk().expectUint(1000);
    },
});