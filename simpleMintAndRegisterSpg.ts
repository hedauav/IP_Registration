import { SPGNFTContractAddress, client } from './utils'
import { createHash } from 'crypto'
import lighthouse from '@lighthouse-web3/sdk'

// BEFORE YOU RUN THIS FUNCTION: Make sure to read the README
// which contains instructions for running this "Simple Mint and Register SPG" example.
require('dotenv').config()

const main = async function () {
    // 1. Set up your IP Metadata
    //
    // Docs: https://docs.story.foundation/docs/ipa-metadata-standard
    const ipMetadata = {
        title: 'Renewable Energy Dataset',
        description: 'This dataset consists of a collection of high-quality images related to renewable energy sources, including solar panels, wind turbines, hydroelectric dams, geothermal plants, and biomass facilities. The images cover various environments, technologies, and operational conditions, making them valuable for machine learning, computer vision, and sustainability research. ',
        createdAt: '1740005219',
        creators: [
            {
                name: 'Rishh',
                address: '0x7822f606a8F2858235B2833782A15F2690F8Ed03',
                contributionPercent: 100,
            },
        ],
        image: 'https://gateway.lighthouse.storage/ipfs/bafybeih3u7ovkmb2yuxdakgx7z5f5leiaigekxebpghv36sn65elibq2na',
        imageHash: '0x12904ff2fad7cfa09ade2fe08faa1079cfe715cf0e007362b259112dd4d42238',
        mediaUrl: 'https://gateway.lighthouse.storage/ipfs/bafybeih3u7ovkmb2yuxdakgx7z5f5leiaigekxebpghv36sn65elibq2na',
        mediaHash: '0x12904ff2fad7cfa09ade2fe08faa1079cfe715cf0e007362b259112dd4d42238',
        mediaType: 'image/jpeg',
    }

    // 2. Set up your NFT Metadata
    //
    // Docs: https://docs.opensea.io/docs/metadata-standards#metadata-structure
    const nftMetadata = {
        name: 'Renewable Energy Dataset',
        description: 'This is a house-style song generated on suno. This NFT represents ownership of the IP Asset.',
        image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
        media: [
            {
                name: 'Midnight Marriage',
                url: 'https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3',
                mimeType: 'audio/mpeg',
            },
        ],
        attributes: [
            {
                key: 'Suno Artist',
                value: 'amazedneurofunk956',
            },
            {
                key: 'Artist ID',
                value: '4123743b-8ba6-4028-a965-75b79a3ad424',
            },
            {
                key: 'Source',
                value: 'TagxIP',
            },
        ],
    }

    // 3. Upload your IP and NFT Metadata to Filecoin via Lighthouse Storage

    if (!process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY) {
        throw new Error('LIGHTHOUSE_STORAGE_KEY is missing from environment variables.')
    } else {
        const ipIpfsHash = await lighthouse.uploadText(JSON.stringify(ipMetadata), process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY, ipMetadata.title)
        const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
        const nftIpfsHash = await lighthouse.uploadText(JSON.stringify(nftMetadata), process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY, nftMetadata.name)
        const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')
        // 4. Register the NFT as an IP Asset
        //
        // Docs: https://docs.story.foundation/docs/sdk-ipasset#mintandregisterip
        const response = await client.ipAsset.mintAndRegisterIp({
            spgNftContract: SPGNFTContractAddress,
            allowDuplicates: true,
            ipMetadata: {
                ipMetadataURI: `https://gateway.lighthouse.storage/ipfs/${ipIpfsHash}`,
                ipMetadataHash: `0x${ipHash}`,
                nftMetadataURI: `https://gateway.lighthouse.storage/ipfs/${nftIpfsHash}`,
                nftMetadataHash: `0x${nftHash}`,
            },
            txOptions: { waitForTransaction: true },
        })
        console.log(`Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`)
        console.log(`View on the explorer: https://aeneid.explorer.story.foundation/ipa/${response.ipId}`)
    }
}

main()
