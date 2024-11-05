import bs58 from "bs58";

export function encodeEthereumAddress(ethereumAddress) {
  // "0x"를 제거하고 주소를 변환
  const address = ethereumAddress.toLowerCase();

  // 16진수 문자열을 Buffer로 변환
  const addressBuffer = Buffer.from(address.slice(2), "hex");

  // Base58로 인코딩
  const encodedAddress = bs58.encode(addressBuffer);

  // 앞의 8글자 반환
  return encodedAddress.slice(0, 8);
}