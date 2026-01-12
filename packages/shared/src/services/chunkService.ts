import type { Chunk } from '../types';
import chunksData from '../data/chunks.json';

export const getChunks = async (): Promise<Chunk[]> => {
  return chunksData.chunks;
};
