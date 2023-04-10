// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donation {
  constructor() public {
  }

  // Keep track of total no. of images
  uint256 public imageCount = 0;

  // Image data to store
  struct Image {
    uint256 id;
    string hash;
    string description;
    uint256 donationAmount;
    address payable author;
  }

  mapping(uint256 => Image) public images;

  event ImageCreated(
    uint256 id,
    string hash,
    string description,
    uint256 donationAmount,
    address payable author
  );

  event DonateImage (
    uint256 id,
    string hash,
    string description,
    uint256 donationAmount,
    address payable author 
  );
}
