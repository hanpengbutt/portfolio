import crypto from "crypto";

export function generateSlug(title: string): string {
  // 1. 한글, 영문, 숫자, 공백을 제외한 특수문자 제거
  const cleanTitle = title.replace(/[^\w\s가-힣]/g, "").trim();
  
  // 2. 연속된 공백을 하이픈(-)으로 변경하고 전체 소문자 변환
  const baseSlug = cleanTitle.replace(/\s+/g, "-").toLowerCase();
  
  // 3. 중복 방지를 위한 4자리 랜덤 해시(16진수) 추가
  const hash = crypto.randomBytes(2).toString("hex");
  
  return `${baseSlug}-${hash}`;
}
