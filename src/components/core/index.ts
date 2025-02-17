/**
 * Core UI Components
 * 
 * This module exports all core UI components following atomic design principles.
 * Components are organized into:
 * - atoms: Basic building blocks (buttons, inputs, icons)
 * - molecules: Combinations of atoms (form fields, search bars)
 * - organisms: Complex UI components (forms, cards)
 */

// Atoms
export * from './Button';
export * from './atoms/Text';
export * from './atoms/Input';
export * from './atoms/Icon';

// Molecules
export * from './molecules/FormField';
export * from './molecules/SearchBar';
export * from './molecules/Alert';

// Organisms
export * from './organisms/Form';
export * from './organisms/Card';
export * from './organisms/Modal';

// Types
export * from './types'; 