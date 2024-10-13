import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ZelaJetton } from '../wrappers/ZelaJetton';
import '@ton/test-utils';

describe('ZelaJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let zelaJetton: SandboxContract<ZelaJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        zelaJetton = blockchain.openContract(await ZelaJetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await zelaJetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: zelaJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and zelaJetton are ready to use
    });
});
