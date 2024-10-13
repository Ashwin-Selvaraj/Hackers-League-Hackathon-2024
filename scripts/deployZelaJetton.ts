import { Address, toNano } from '@ton/core';
import { ZelaJetton } from '../wrappers/ZelaJetton';
import { NetworkProvider } from '@ton/blueprint';
import {buildOnchainMetadata} from '../utils/jetton-helpers';

// import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "Zela",
        description: "Transform everyday activities into epic challenges! Challenge your friends to dares, compete in head-to-head duels, or dive into global pools for nonstop excitement.",
        symbol: "ZELA",
        image: "https://sapphire-large-cougar-300.mypinata.cloud/ipfs/QmWB8XwD4ckYcy6yS6bHiY29UCats7Y9R34MzbZxbz4f8s",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const zelaJetton = provider.open(await ZelaJetton.fromInit(provider.sender().address as Address, content, 100000000000000000000n));
    

    await zelaJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            //minting put team token allocation
            amount: 10000000000000000000n,
            receiver: provider.sender().address as Address
        }
    );
    await provider.waitForDeploy(zelaJetton.address);
    // run methods on `zelaJetton`
}

