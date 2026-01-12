import chunksData from '../data/chunks.json';

export interface Chunk {
  chunk: string;
  pronunciation: string;
  chinese_meaning: string;
  suitable_scenes: string[];
}

export const getChunks = async (): Promise<Chunk[]> => {
  // In the future, this could be replaced with an API call
  // return await fetch('/api/chunks').then(res => res.json());
  return (await import('../data/chunks.json')).chunks;
}; 