/**
 * @summary
 * Centralized constants exports.
 * Provides single import point for all application constants.
 *
 * @module constants
 */

/**
 * Product constants
 */
export {
  PRODUCT_DEFAULTS,
  PRODUCT_IMAGE_LIMITS,
  PRODUCT_VALIDATION_LIMITS,
  PRODUCT_IMAGE_FORMATS,
  type ProductDefaultsType,
  type ProductImageLimitsType,
  type ProductValidationLimitsType,
  type ProductImageFormatsType,
} from './product';

/**
 * Cart constants
 */
export { CART_DEFAULTS, type CartDefaultsType } from './cart';

/**
 * Contact constants
 */
export {
  CONTACT_DEFAULTS,
  CONTACT_VALIDATION_LIMITS,
  CONTACT_SECURITY,
  CONTACT_STATUS,
  type ContactDefaultsType,
  type ContactValidationLimitsType,
  type ContactSecurityType,
  type ContactStatusType,
  type ContactStatus,
} from './contact';
