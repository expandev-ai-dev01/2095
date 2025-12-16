/**
 * @summary
 * In-memory store instance for Contact entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/contact/contactStore
 */

import { ContactEntity } from '@/services/contact/contactTypes';

/**
 * In-memory store for Contact records
 */
class ContactStore {
  private contacts: Map<number, ContactEntity> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all contacts
   */
  getAll(): ContactEntity[] {
    return Array.from(this.contacts.values());
  }

  /**
   * Get contact by ID
   */
  getById(id: number): ContactEntity | undefined {
    return this.contacts.get(id);
  }

  /**
   * Add new contact
   */
  add(contact: ContactEntity): ContactEntity {
    this.contacts.set(contact.id, contact);
    return contact;
  }

  /**
   * Update existing contact
   */
  update(id: number, data: Partial<ContactEntity>): ContactEntity | undefined {
    const existing = this.contacts.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, dateModified: new Date().toISOString() };
    this.contacts.set(id, updated);
    return updated;
  }

  /**
   * Delete contact by ID
   */
  delete(id: number): boolean {
    return this.contacts.delete(id);
  }

  /**
   * Check if contact exists
   */
  exists(id: number): boolean {
    return this.contacts.has(id);
  }

  /**
   * Get total count of contacts
   */
  count(): number {
    return this.contacts.size;
  }

  /**
   * Clear all contacts (useful for testing)
   */
  clear(): void {
    this.contacts.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of ContactStore
 */
export const contactStore = new ContactStore();
