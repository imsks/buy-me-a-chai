const { assert } = require("chai")
const Donation = artifacts.require("./Donation.sol")
require("chai").use(require("chai-as-promised")).should()

contract("Donation", ([deployer, author, donator]) => {
    let donationContract
    before(async () => {
        donationContract = await Donation.deployed()
    })

    describe("deployment", () => {
        it("should be an instance of Donation", async () => {
            const address = await donationContract.address
            assert.notEqual(address, null)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, "")
            assert.notEqual(address, undefined)
        })
    })

    describe("Images", () => {
        let result
        const hash = "abcd1234"
        const description = "This is a test image"
        let imageCount
        before(async () => {
            result = await donationContract.uploadImage(hash, description, {
                from: author
            })
            imageCount = await donationContract.imageCount()
        })

        it("Check Image", async () => {
            let image = await donationContract.images(1)
            assert.equal(imageCount, 1)
            const event = result.logs[0].args
            assert.equal(event.hash, hash)
            assert.equal(event.description, description)
        })

        it("Allow users to donate", async () => {
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
            result = await donationContract.donateImage(imageCount, {
                from: donator,
                value: web3.utils.toWei("1", "Ether")
            })

            const event = result.logs[0].args
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let donateImage
            donateImage = web3.utils.toWei("1", "Ether")
            donateImage = new web3.utils.BN(donateImage)

            const expectedBalance = oldAuthorBalance.add(donateImage)
            assert.equal(
                newAuthorBalance.toString(),
                expectedBalance.toString()
            )
        })
    })
})
