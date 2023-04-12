// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donation {
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

  // Create an image
  function uploadImage(string memory _imgHash, string memory _description) public payable {
    // Check conditions
    require(bytes(_imgHash).length > 0);
    require(bytes(_description).length > 0);
    require(msg.sender != address(0x0));

    // Increate image count
    imageCount++;

    // Save image into mapping
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, payable(msg.sender));

    // Emit event
    emit ImageCreated(imageCount, _imgHash, _description, 0, payable(msg.sender));
  }

  // Donate an image
  function donateImage(uint256 _id) public payable {
    require(_id > 0 && _id <= imageCount);

    // Get image from mapping
    Image memory _image = images[_id];

    // Get address of Author
    address payable _author = _image.author;

    // Transfer donation amount
    _author.transfer(msg.value);

    // Set donation for image
    _image.donationAmount = _image.donationAmount + msg.value;

    // Set image to mapping
    images[_id] = _image;

    emit DonateImage(_id, _image.hash, _image.description, _image.donationAmount, _image.author);
  }
}
