/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@veltara/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  prfId(): string;
  stgId(): string;
  recId(): string;
  gatId(): string;
  mktId(): string;
  frzId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
