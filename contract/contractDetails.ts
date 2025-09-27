export const CONTRACT_ABI= [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "decryptionBlockNumber",
				"type": "uint256"
			},
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256[2]",
								"name": "x",
								"type": "uint256[2]"
							},
							{
								"internalType": "uint256[2]",
								"name": "y",
								"type": "uint256[2]"
							}
						],
						"internalType": "struct BLS.PointG2",
						"name": "u",
						"type": "tuple"
					},
					{
						"internalType": "bytes",
						"name": "v",
						"type": "bytes"
					},
					{
						"internalType": "bytes",
						"name": "w",
						"type": "bytes"
					}
				],
				"internalType": "struct TypesLib.Ciphertext",
				"name": "encryptedData",
				"type": "tuple"
			}
		],
		"name": "createTimelockRequest",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestID",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "decryptionKey",
				"type": "bytes"
			}
		],
		"name": "receiveBlocklock",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "blocklockContract",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "blocklock",
		"outputs": [
			{
				"internalType": "contract IBlocklockSender",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userEncryptedValue",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256[2]",
						"name": "x",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "y",
						"type": "uint256[2]"
					}
				],
				"internalType": "struct BLS.PointG2",
				"name": "u",
				"type": "tuple"
			},
			{
				"internalType": "bytes",
				"name": "v",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "w",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userRequestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]