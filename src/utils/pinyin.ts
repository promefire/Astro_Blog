import TinyPinyin from 'tiny-pinyin';

export function toPinyin(str: string) {
  // 确保 TinyPinyin 已初始化
  if (typeof TinyPinyin.convertToPinyin !== 'function') {
    throw new Error('TinyPinyin 未正确加载');
  }
  return TinyPinyin.convertToPinyin(str, '-', true)
    .replace(/[^a-zA-Z0-9\-]/g, '')
    .toLowerCase();
}