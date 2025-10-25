// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MockPYUSD
 * @dev Mock PayPal USD (PYUSD) token for testing on Sepolia testnet
 * This contract mimics PYUSD behavior for development and demo purposes
 * 
 * Features:
 * - 6 decimals (same as real PYUSD/USDC)
 * - Faucet function for easy testing
 * - Mint function for owner
 */
contract MockPYUSD is ERC20, Ownable {
    uint8 private constant DECIMALS = 6;
    uint256 public constant FAUCET_AMOUNT = 10000 * 10**DECIMALS; // 10,000 PYUSD per request
    
    // Track last faucet request time per address to prevent spam
    mapping(address => uint256) public lastFaucetRequest;
    uint256 public constant FAUCET_COOLDOWN = 1 hours;
    
    constructor() ERC20("PayPal USD", "PYUSD") Ownable(msg.sender) {
        // Mint initial supply to deployer (1 million PYUSD)
        _mint(msg.sender, 1_000_000 * 10**DECIMALS);
    }
    
    /**
     * @dev Returns 6 decimals to match real PYUSD
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
    
    /**
     * @dev Allows owner to mint more tokens for testing
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint (in smallest unit)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Allows anyone to get free tokens for testing (faucet function)
     * Has a cooldown period to prevent spam
     */
    function faucet() external {
        require(
            block.timestamp >= lastFaucetRequest[msg.sender] + FAUCET_COOLDOWN,
            "Faucet cooldown active. Please wait before requesting again."
        );
        
        lastFaucetRequest[msg.sender] = block.timestamp;
        _mint(msg.sender, FAUCET_AMOUNT);
    }
    
    /**
     * @dev Returns the time remaining until the next faucet request is available
     * @param user Address to check cooldown for
     * @return Time in seconds until next faucet request (0 if available now)
     */
    function faucetCooldownRemaining(address user) external view returns (uint256) {
        uint256 nextAvailable = lastFaucetRequest[user] + FAUCET_COOLDOWN;
        if (block.timestamp >= nextAvailable) {
            return 0;
        }
        return nextAvailable - block.timestamp;
    }
}
