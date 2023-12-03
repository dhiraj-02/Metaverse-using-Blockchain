

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp{

    //USER STRUCT
    struct user{
        string name;
        string avatar;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }


    struct meeting{
        string name;
        string[] messages;
    }

    struct AllUserStruck{
        string name;
        address accountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => meeting[]) allMeetings;

    //CHECK USER EXIST
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    //CREATE ACCOUNT
    function createAccount(string calldata name, string calldata avatar) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length>0, "Username cannot be empty");
        require(bytes(avatar).length>0, "Please select a avatar nft");
        userList[msg.sender].name = name;
        userList[msg.sender].avatar = avatar;
        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    function getAvatar(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].avatar;
    }

    //ADD FRIENDS
    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender != friend_key, "Users cannot add themeselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key)== false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //checkAlreadyFriends
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool){

        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            
            if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key, name);
       userList[me].friendList.push(newFriend);
    }

    //GETMY FRIEND
    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //get chat code
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if(pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else 
        return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    //SEND MESSAGE
    function sendMessage(address friend_key,string memory meetname, string[] calldata _msg) external{
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friend with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        meeting memory newMeet = meeting(meetname, _msg);
        allMeetings[chatCode].push(newMeet);
    }

    //READ MESSAGE
    function readMeetings(address friend_key) external view returns(meeting[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMeetings[chatCode];
    }

    function getAllAppUser() public view returns(AllUserStruck[] memory){
        return getAllUsers;
    }
}