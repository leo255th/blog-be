// 密码散列

import SHA512 from 'sha512-es';

const pwdSalt = "-myblog-leo255th"

export function pwdEncrypt(pwd, salt = pwdSalt): string {
  const pwdHash = SHA512.hash(pwd.trim() + pwdSalt);
  return pwdHash;
}