import nodeCrypto from 'crypto'

/**
 * SSR/CSR-safe Crypto implementation
 */
export const crypto = typeof window !== 'undefined' ? window.crypto : nodeCrypto
