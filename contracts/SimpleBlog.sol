// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.8.21;

contract SimpleBlog {
    struct Post {
        string title;
        string content;
    }

    Post[] public posts;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createPost(string memory title, string memory content) public {
        require(msg.sender == owner, "Only the owner can create posts");
        posts.push(Post(title, content));
    }

    function getPostCount() public view returns (uint256) {
        return posts.length;
    }

    function getPost(uint256 index) public view returns (string memory title, string memory content) {
        require(index < posts.length, "Post does not exist");
        Post storage post = posts[index];
        return (post.title, post.content);
    }
}

