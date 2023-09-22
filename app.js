window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.error('Web3 not found. Please install a wallet like MetaMask.');
        return;
    }

    const contractAddress = '0xA461DCd62E54CCd5D3274a798993574C0365828D'; 
    const contractABI = [
        {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
        },
        {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "createPost",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getPost",
        "outputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "getPostCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
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
        "name": "posts",
        "outputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        }
        ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the owner's address
    const owner = await contract.methods.owner().call();
    document.getElementById('ownerAddress').textContent = owner;

    // Listen to the form submission
    document.getElementById('postForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        try {
            await contract.methods.createPost(title, content).send({ from: window.ethereum.selectedAddress });
            alert('Post created successfully!');
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Error creating post.');
        }
    });

    // Display existing posts
    const postCount = await contract.methods.getPostCount().call();
    const postList = document.getElementById('postList');

    for (let i = 0; i < postCount; i++) {
        const post = await contract.methods.getPost(i).call();
        console.log('Post count:', postCount);
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${post.title}</strong><br>${post.content}`;
        postList.appendChild(listItem);
    }
});
